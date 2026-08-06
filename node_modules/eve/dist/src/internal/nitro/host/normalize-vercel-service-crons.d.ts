/**
 * Makes an eve service's cron paths addressable through its public Vercel
 * mount before the service Build Output is returned to Vercel for assembly.
 */
export declare function normalizeVercelServiceCrons(input: {
    readonly publicRoutePrefix?: string;
    readonly serviceOutputDirectory: string;
}): Promise<void>;
