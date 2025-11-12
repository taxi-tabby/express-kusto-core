/**
 * Configurable type definitions for kusto-framework-core
 * 
 * These types can be augmented in the consuming project to provide
 * proper type inference for dependency injection, repositories, and databases.
 * 
 * @example
 * In your project, create a file (e.g., `src/types/kusto-augmentation.d.ts`):
 * ```typescript
 * import type { Injectable } from './path/to/generated-injectable-types';
 * import type { RepositoryTypeMap } from './path/to/generated-repository-types';
 * import type { DatabaseClientMap } from './path/to/generated-db-types';
 * 
 * declare module 'kusto-framework-core' {
 *   interface KustoConfigurableTypes {
 *     Injectable: Injectable;
 *     RepositoryTypeMap: RepositoryTypeMap;
 *     DatabaseClientMap: DatabaseClientMap;
 *   }
 * }
 * ```
 */

/**
 * Default empty types - will be augmented by consuming project
 */
export interface KustoConfigurableTypes {
    /** Injectable modules (dependency injection) */
    Injectable: any;
    
    /** Repository type map */
    RepositoryTypeMap: any;
    
    /** Database client map */
    DatabaseClientMap: any;
}

/**
 * Helper type to get injectable types
 * Directly uses KustoConfigurableTypes to pick up module augmentation
 */
export type GetInjectable<T extends KustoConfigurableTypes = KustoConfigurableTypes> = KustoConfigurableTypes['Injectable'];

/**
 * Helper type to get repository manager type
 * Directly uses KustoConfigurableTypes to pick up module augmentation
 */
export type GetRepositoryManager<T extends KustoConfigurableTypes = KustoConfigurableTypes> = KustoConfigurableTypes['RepositoryTypeMap'];

/**
 * Helper type to get Prisma manager type  
 * Directly uses KustoConfigurableTypes to pick up module augmentation
 */
export type GetPrismaManager<T extends KustoConfigurableTypes = KustoConfigurableTypes> = KustoConfigurableTypes['DatabaseClientMap'];
