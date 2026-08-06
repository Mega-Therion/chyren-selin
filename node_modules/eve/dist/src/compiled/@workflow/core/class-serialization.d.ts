/**
 * Class serialization utilities.
 *
 * This module is separate from private.ts to avoid pulling in Node.js-only
 * dependencies (like async_hooks via get-closure-vars.ts) when used in
 * workflow bundles.
 */
/**
 * Register a class constructor for serialization.
 * This allows class constructors to be deserialized by looking up the classId.
 *
 * Note: The SWC plugin now inlines equivalent registration logic as a
 * self-contained IIFE (using the same globalThis Symbol-keyed registry),
 * so this function is no longer imported by generated code. It is retained
 * for programmatic use and testing.
 *
 * Also sets the `classId` property on the class so the serializer can find it
 * when serializing instances (e.g., step return values).
 */
export declare function registerSerializationClass(classId: string, cls: Function): void;
/**
 * Stable, well-known registry id for the SDK's `Run` class.
 *
 * The SWC plugin auto-registers `Run` under a *path-derived* id (e.g.
 * `class//./node_modules/@workflow/core/dist/runtime/run//Run`), which
 * varies with the app's dependency layout and bundler. Host-side code
 * that needs to construct `Run` instances inside the workflow VM (e.g.
 * the hook event consumer resolving `hook.getConflict()`) cannot know
 * that id statically, so the workflow-mode `create-hook` module also
 * aliases the bundle's `Run` under this stable id at evaluation time.
 *
 * The `workflow` pseudo-path cannot collide with plugin-derived ids,
 * which always use real relative module paths (`./…` / `../…`).
 */
export declare const RUN_CLASS_ID = "class//workflow//Run";
/**
 * Register an additional registry id for a class without touching its
 * `classId` property.
 *
 * Unlike {@link registerSerializationClass}, this is safe to call for a
 * class the SWC plugin has already registered: the plugin's inlined IIFE
 * defines `classId` as non-configurable, so a second `defineProperty`
 * would throw. Aliasing only adds a registry entry — the class keeps
 * serializing under its primary (path-derived) id, while lookups succeed
 * under both.
 *
 * Registration is per-global by construction: evaluated inside the
 * workflow VM it registers the VM's compiled class on the VM's registry;
 * evaluated on the host it registers the host class on the host's
 * registry. Each context resolves its own correct variant.
 */
export declare function aliasSerializationClass(classId: string, cls: Function, global?: Record<string, any>): void;
/**
 * Find a registered class constructor by ID (used during deserialization)
 *
 * @param classId - The class ID to look up
 * @param global - The global object to check. This ensures workflow code running
 *                 in a VM only accesses classes registered on the VM's global,
 *                 matching production serverless behavior where workflow code
 *                 runs in isolation.
 */
export declare function getSerializationClass(classId: string, global: Record<string, any>): Function | undefined;
//# sourceMappingURL=class-serialization.d.ts.map