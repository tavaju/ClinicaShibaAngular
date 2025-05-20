/**
 * NoInfer utility type - helps TypeScript to avoid inferring types in certain contexts.
 * This is a polyfill for newer TypeScript versions that have this built-in.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export type NoInfer<T> = [T][T extends any ? 0 : never];
