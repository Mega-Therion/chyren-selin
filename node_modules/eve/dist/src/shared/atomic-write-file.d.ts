/**
 * Writes `contents` so concurrent readers always observe either the old or
 * the new file, never a truncated intermediate: a plain `writeFile` truncates
 * first and streams bytes, while a sibling temp file plus POSIX-atomic
 * `rename` rules that window out.
 *
 * Windows refuses to replace a file while another handle is open on it
 * (concurrent readers, `utimes` heartbeats, antivirus scans), surfacing as
 * `EPERM`/`EACCES`/`EBUSY`, so the replace is retried briefly before giving up.
 */
export declare function atomicWriteFile(targetPath: string, contents: string | Buffer | Uint8Array): Promise<void>;
