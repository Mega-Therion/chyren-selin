export type OutputPublicationPhase = "acquired" | "prepared" | "backed-up" | "committed";
export interface OutputPublicationJournal {
    readonly finalOutputDir: string;
    readonly finalSummaryPath: string;
    hadOutput: boolean;
    hadSummary: boolean;
    liveness: "active" | "recoverable";
    readonly outputBackupPath: string;
    phase: OutputPublicationPhase;
    readonly pid: number;
    readonly scratchDir: string;
    readonly stagedOutputDir: string;
    readonly stagedSummaryPath: string;
    readonly summaryBackupPath: string;
    readonly token: string;
}
export interface RecoveryLeaseJournal {
    readonly pid: number;
    readonly token: string;
}
export declare function writeOutputPublicationJournal(lockPath: string, journal: OutputPublicationJournal): Promise<void>;
export declare function readOutputPublicationJournal(lockPath: string): Promise<OutputPublicationJournal | undefined>;
export declare function writeRecoveryLeaseJournal(leasePath: string, journal: RecoveryLeaseJournal): Promise<void>;
export declare function readRecoveryLeaseJournal(leasePath: string): Promise<RecoveryLeaseJournal | undefined>;
/**
 * Resolves the journal file inside a lock or lease directory. Exposed so
 * the lock module can heartbeat the file's mtime while a publication or
 * recovery is in flight.
 */
export declare function resolveJournalFilePath(path: string): string;
