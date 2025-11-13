/**
 * Configurable type definitions for kusto-framework-core
 * 
 * These types can be augmented in the consuming project to provide
 * proper type inference for dependency injection, repositories, and databases.
 * 
 * @example
 * In your project, create a file (e.g., `src/types/kusto-types.d.ts`):
 * ```typescript
 * import type { Injectable } from '../core/generated-injectable-types';
 * import type { RepositoryTypeMap } from '../core/generated-repository-types';
 * import type { DatabaseClientMap } from '../core/generated-db-types';
 * 
 * declare module 'kusto-framework-core' {
 *   interface KustoConfigurableTypes {
 *     injectable: Injectable;
 *     repositoryTypeMap: RepositoryTypeMap;
 *     databaseClientMap: DatabaseClientMap;
 *   }
 * }
 * 
 * export {} // Make this a module
 * ```
 */

/**
 * Configurable types interface for module augmentation
 * DO NOT set default values - empty interface will be augmented
 */
export interface KustoConfigurableTypes {}

/**
 * Helper type aliases with proper fallback
 * Uses infer to extract augmented types
 */
export type GetInjectable = KustoConfigurableTypes extends { injectable: infer T } 
    ? T 
    : {};
    
export type GetRepositoryManager = KustoConfigurableTypes extends { repositoryTypeMap: infer T } 
    ? T 
    : {};
    
export type GetPrismaManager = KustoConfigurableTypes extends { databaseClientMap: infer T } 
    ? T 
    : {};
