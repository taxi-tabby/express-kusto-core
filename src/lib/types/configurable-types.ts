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
 *     Injectable: Injectable;
 *     RepositoryTypeMap: RepositoryTypeMap;
 *     DatabaseClientMap: DatabaseClientMap;
 *   }
 * }
 * ```
 */

/**
 * Configurable types interface for module augmentation
 * 
 * This interface is intentionally minimal to allow proper augmentation.
 * Consuming projects should augment this interface with their specific types.
 */
export interface KustoConfigurableTypes {
    Injectable?: unknown;
    RepositoryTypeMap?: unknown;
    DatabaseClientMap?: unknown;
}

/**
 * Helper type to get injectable types
 * Extracts the actual type from augmentation, defaults to {} if not set
 */
export type GetInjectable = KustoConfigurableTypes['Injectable'] extends unknown
    ? (KustoConfigurableTypes extends { Injectable: infer T } ? T : {})
    : {};

/**
 * Helper type to get repository manager type
 * Extracts the actual type from augmentation, defaults to {} if not set
 */
export type GetRepositoryManager = KustoConfigurableTypes['RepositoryTypeMap'] extends unknown
    ? (KustoConfigurableTypes extends { RepositoryTypeMap: infer T } ? T : {})
    : {};

/**
 * Helper type to get Prisma manager type
 * Extracts the actual type from augmentation, defaults to {} if not set
 */
export type GetPrismaManager = KustoConfigurableTypes['DatabaseClientMap'] extends unknown
    ? (KustoConfigurableTypes extends { DatabaseClientMap: infer T } ? T : {})
    : {};
