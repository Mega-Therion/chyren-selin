import type { OutputPublicationJournal } from "#internal/application/output-publication-journal.js";
export declare function assertStagedPublicationExists(journal: OutputPublicationJournal): Promise<void>;
export declare function prepareOutputPublication(journal: OutputPublicationJournal): Promise<void>;
export declare function backupOutputPublication(journal: OutputPublicationJournal): Promise<void>;
export declare function installOutputPublication(journal: OutputPublicationJournal, afterOutputInstall: () => Promise<void>): Promise<void>;
export declare function rollbackOutputPublication(journal: OutputPublicationJournal): Promise<void>;
export declare function removeOutputPublicationBackups(journal: OutputPublicationJournal): Promise<void>;
