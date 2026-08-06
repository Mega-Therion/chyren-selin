export declare function assertSourceSize(source: string, maxSourceBytes: number): void;
export declare function transformSource(source: string): string;
export declare function getTransformedSourceCacheStats(): {
    entries: number;
    bytes: number;
    maxEntries: number;
    maxBytes: number;
    maxEntryBytes: number;
};
export declare function clearTransformedSourceCache(): void;
//# sourceMappingURL=source-cache.d.ts.map