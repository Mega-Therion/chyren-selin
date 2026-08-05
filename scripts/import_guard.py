#!/usr/bin/env python3
"""
selin_import_guard.py — SELIN Import Air Gap Guard (Hardcoded)

THIS IS THE IMPORT-SIDE OF THE BILATERAL AIR GAP.

SELIN is public open-source. It must NEVER accept imports containing
personal data from AEON (or any private source). This script is the
hardcoded guard that enforces that rule.

ANY future import, restore, or data-loading functionality in SELIN
MUST call this guard before processing incoming data. If the guard
fails, the import MUST be refused. No exceptions. No overrides.

Usage:
    # As a library (called by future import code)
    from import_guard import check_import_safety
    result = check_import_safety(data)
    if not result.safe:
        raise ImportError(result.reason)

    # As a CLI (for manual verification)
    python scripts/import_guard.py --check <file_or_archive>
    python scripts/import_guard.py --check-dir <directory>

EXIT CODES:
    0 = Data is safe to import (no personal data detected)
    1 = Data CONTAINS personal data — IMPORT REFUSED
    2 = Error during scan (treat as unsafe — fail closed)
"""
import os, sys, json, re, tarfile, hashlib
from pathlib import Path

VERSION = "1.0.0"

# ─── MARKERS THAT IDENTIFY AEON PRIVATE ARCHIVES ───────────────────────────

# Files that should never exist in SELIN
FORBIDDEN_FILES = [
    ".private-marker",
    "identity_basepoint.json",   # Contains AEON's identity seal
    "qdrant_snapshot.json",       # Contains personal vector embeddings
    "zettelkasten",               # Contains personal knowledge graph
    "file_index.json",            # Contains private repo file paths
    "project_meta.json",          # Contains private repo metadata
    "aeon_spoke",                 # Any spoke archive component
]

# JSON fields that indicate personal data
PII_FIELD_MARKERS = [
    "supabase_ref",
    "supabase_key",
    "qdrant_url",
    "qdrant_collection",
    "qdrant_snapshot",
    "commit_sha",
    "branch",
    "file_path",
    "file_index",
    "identity_basepoint",
    "blake3_hash",          # Could be an identity seal hash
    "zettelkasten",
    "knowledge_graph",
    "model_endpoint",
    "api_key",
    "token",
    "secret",
    "password",
    "user_data",
    "personal_data",
    "raw_output",
    "prompt_hash",
    "export_mode",
    "source",                # AEON export manifests have a "source" section
]

# Content patterns that indicate personal data
PII_CONTENT_PATTERNS = [
    # AEON spoke archive markers
    (re.compile(r'aeon_spoke', re.IGNORECASE), "aeon_spoke_marker"),
    (re.compile(r'\.private-marker', re.IGNORECASE), "private_marker"),
    # Qdrant vector data
    (re.compile(r'"points"\s*:\s*\['), "qdrant_vectors"),
    (re.compile(r'"collection"\s*:\s*"chyren_memory'), "qdrant_collection"),
    # Zettelkasten knowledge
    (re.compile(r'zettelkasten', re.IGNORECASE), "zettelkasten"),
    # Supabase references
    (re.compile(r'supabase\.(?:co|com)'), "supabase_url"),
    (re.compile(r'"supabase_ref"'), "supabase_ref"),
    # AEON-specific file paths
    (re.compile(r'\.chyren/', re.IGNORECASE), "chyren_directory"),
    (re.compile(r'/home/|/Users/', re.IGNORECASE), "home_directory"),
    # Personal credentials
    (re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----'), "private_key"),
    (re.compile(r'sk-[a-zA-Z0-9]{20,}'), "api_key"),
    (re.compile(r'eyJ[a-zA-Z0-9_-]{10,}\.eyJ'), "jwt_token"),
    (re.compile(r'AKIA[0-9A-Z]{16}'), "aws_key"),
    # Email addresses
    (re.compile(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'), "email"),
    # Private IPs with ports (infrastructure disclosure)
    (re.compile(r'\b(?:10|172|192)\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d+)?\b'), "private_ip"),
]


class ImportGuardResult:
    """Result of an import safety check."""
    def __init__(self):
        self.safe = True
        self.reasons = []
        self.warnings = []
        self.scanned_files = 0
        self.scanned_bytes = 0

    def block(self, reason):
        self.safe = False
        self.reasons.append(reason)

    def warn(self, reason):
        self.warnings.append(reason)

    def report(self):
        lines = []
        if self.safe:
            lines.append("  ✓ Import safe — no personal data detected")
        else:
            lines.append("  ✗ IMPORT REFUSED — personal data detected:")
            for r in self.reasons:
                lines.append(f"    • {r}")
        if self.warnings:
            lines.append(f"  ⚠ Warnings ({len(self.warnings)}):")
            for w in self.warnings:
                lines.append(f"    • {w}")
        lines.append(f"  Scanned: {self.scanned_files} files, {self.scanned_bytes:,} bytes")
        return "\n".join(lines)


def scan_content(data_str, result):
    """Scan a string for PII content patterns."""
    for pattern, name in PII_CONTENT_PATTERNS:
        matches = pattern.findall(data_str)
        if matches:
            # First few matches for context
            for m in matches[:3]:
                snippet = m if isinstance(m, str) else str(m)
                snippet = snippet[:30] + "..." if len(snippet) > 30 else snippet
                result.block(f"Content pattern '{name}' detected: {snippet}")


def scan_json_fields(data, result, path=""):
    """Recursively scan JSON for forbidden field markers."""
    if isinstance(data, dict):
        for key, value in data.items():
            full_path = f"{path}.{key}" if path else key
            key_lower = key.lower()

            # Check if this key is a known PII field marker
            for marker in PII_FIELD_MARKERS:
                if marker in key_lower:
                    result.block(f"Forbidden field '{full_path}' (matches '{marker}')")
                    break

            # Check the value if it's a string
            if isinstance(value, str):
                for pattern, name in PII_CONTENT_PATTERNS:
                    if pattern.search(value):
                        result.block(f"PII pattern '{name}' in field '{full_path}'")
                        break

            # Recurse
            scan_json_fields(value, result, full_path)
    elif isinstance(data, list):
        for i, item in enumerate(data):
            scan_json_fields(item, result, f"{path}[{i}]")


def check_file(filepath, result):
    """Check a single file for personal data."""
    try:
        size = os.path.getsize(filepath)
        result.scanned_files += 1
        result.scanned_bytes += size

        # Check filename against forbidden files
        basename = os.path.basename(filepath)
        for forbidden in FORBIDDEN_FILES:
            if forbidden in basename:
                result.block(f"Forbidden file present: {basename}")

        # Read and scan content (limit to 10MB per file)
        if size > 10 * 1024 * 1024:
            result.warn(f"File too large to scan fully: {filepath} ({size:,} bytes)")
            with open(filepath, 'r', errors='ignore') as f:
                content = f.read(10 * 1024 * 1024)
        else:
            with open(filepath, 'r', errors='ignore') as f:
                content = f.read()

        scan_content(content, result)

        # If it's JSON, also scan field names
        if filepath.endswith('.json'):
            try:
                data = json.loads(content)
                scan_json_fields(data, result)
            except json.JSONDecodeError:
                pass  # Not valid JSON, content scan is sufficient

    except Exception as e:
        result.warn(f"Could not scan {filepath}: {e}")


def check_archive(archive_path, result):
    """Check a tar.gz archive for personal data without extracting it."""
    try:
        size = os.path.getsize(archive_path)
        result.scanned_files += 1
        result.scanned_bytes += size

        with tarfile.open(archive_path, "r:gz") as tar:
            for member in tar.getmembers():
                # Check member name against forbidden files
                for forbidden in FORBIDDEN_FILES:
                    if forbidden in member.name:
                        result.block(f"Archive contains forbidden file: {member.name}")
                        break

                # If it's a small file, try to read and scan it
                if member.isfile() and member.size < 5 * 1024 * 1024:
                    f = tar.extractfile(member)
                    if f:
                        content = f.read().decode('utf-8', errors='ignore')
                        scan_content(content, result)

                        # If it's JSON, scan field names too
                        if member.name.endswith('.json'):
                            try:
                                data = json.loads(content)
                                scan_json_fields(data, result)
                            except json.JSONDecodeError:
                                pass

    except tarfile.ReadError:
        result.warn(f"Could not read archive: {archive_path}")
    except Exception as e:
        result.warn(f"Error scanning archive: {e}")


def check_import_safety(data):
    """Main library function: check if data is safe to import into SELIN.
    Returns an ImportGuardResult with .safe (bool) and .reasons (list)."""
    result = ImportGuardResult()

    if isinstance(data, str):
        # String input — scan as content
        scan_content(data, result)
        # Try to parse as JSON for field scanning
        try:
            json_data = json.loads(data)
            scan_json_fields(json_data, result)
        except json.JSONDecodeError:
            pass
    elif isinstance(data, dict):
        scan_json_fields(data, result)
    elif isinstance(data, (bytes, bytearray)):
        scan_content(data.decode('utf-8', errors='ignore'), result)
    else:
        result.warn(f"Unknown data type: {type(data)}")

    return result


def check_path(path):
    """Check a file, directory, or archive for personal data."""
    result = ImportGuardResult()

    path = Path(path)

    if not path.exists():
        print(f"  ✗ Path does not exist: {path}")
        return result, 2

    if path.is_file():
        if path.suffix in ('.gz', '.tgz', '.tar.gz'):
            check_archive(str(path), result)
        else:
            check_file(str(path), result)
    elif path.is_dir():
        for root, dirs, files in os.walk(path):
            # Skip .git directories
            if '.git' in dirs:
                dirs.remove('.git')
            for fname in files:
                fpath = os.path.join(root, fname)
                if fpath.endswith(('.gz', '.tgz', '.tar.gz')):
                    check_archive(fpath, result)
                else:
                    check_file(fpath, result)
    else:
        print(f"  ✗ Unknown path type: {path}")
        return result, 2

    return result, 0


def main():
    import argparse
    parser = argparse.ArgumentParser(
        description="SELIN Import Air Gap Guard — refuses personal data from AEON"
    )
    parser.add_argument("--check", help="Check a file or archive for personal data")
    parser.add_argument("--check-dir", help="Check a directory for personal data")
    parser.add_argument("--version", action="version", version=f"import_guard v{VERSION}")
    args = parser.parse_args()

    print(f"SELIN Import Guard v{VERSION}")
    print(f"  Enforcing bilateral air gap: AEON personal data must NEVER enter SELIN")
    print()

    if args.check:
        result, code = check_path(args.check)
        print(result.report())
        if not result.safe:
            print("\n  ╔══════════════════════════════════════════════════════════════╗")
            print("  ║  IMPORT REFUSED — personal data from AEON detected.        ║")
            print("  ║  This data cannot be imported into SELIN.                   ║")
            print("  ║  See AIR_GAP_POLICY.md for the bilateral contract.          ║")
            print("  ╚══════════════════════════════════════════════════════════════╝")
            sys.exit(1)
        print("\n  ✓ Import approved — no personal data detected")
        sys.exit(0)

    elif args.check_dir:
        result, code = check_path(args.check_dir)
        print(result.report())
        if not result.safe:
            print("\n  ╔══════════════════════════════════════════════════════════════╗")
            print("  ║  IMPORT REFUSED — personal data from AEON detected.        ║")
            print("  ║  This directory cannot be imported into SELIN.              ║")
            print("  ║  See AIR_GAP_POLICY.md for the bilateral contract.          ║")
            print("  ╚══════════════════════════════════════════════════════════════╝")
            sys.exit(1)
        print("\n  ✓ Directory approved — no personal data detected")
        sys.exit(0)

    else:
        parser.print_help()
        sys.exit(2)


if __name__ == "__main__":
    main()
