import { NoInfer } from './app/shared/types/utility-types';

/**
 * This file contains global type augmentations to address 
 * potential missing types in TypeScript or third-party libraries.
 */
declare global {
  // Add NoInfer type to global scope
  type NoInfer<T> = [T][T extends any ? 0 : never];
}
