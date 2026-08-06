/**
 * Copies host middleware functions into a generated service Build Output.
 *
 * Vercel validates generated-service routes against each service builder's
 * function map. The host remains the runtime owner of these functions; this
 * copy makes that same opaque Build Output function available while Vercel
 * collects the generated service.
 */
export declare function copyHostMiddlewareFunctions(input: {
    readonly hostOutputDirectory: string;
    readonly serviceOutputDirectory: string;
}): Promise<void>;
