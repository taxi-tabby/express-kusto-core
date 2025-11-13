/**
 * Configurable type definitions for kusto-framework-core
 * 
 * These types can be augmented in the consuming project to provide
 * proper type inference for dependency injection, repositories, and databases.
 * 
 * @example
 * In your project, create a file (e.g., `src/types/kusto-types.d.ts`):
 * ```typescript
 * import type { Injectable, Middleware, MiddlewareParams, MIDDLEWARE_PARAM_MAPPING } from '../core/generated-injectable-types';
 * import type { RepositoryTypeMap } from '../core/generated-repository-types';
 * import type { DatabaseClientMap } from '../core/generated-db-types';
 * 
 * declare module 'kusto-framework-core' {
 *   interface KustoConfigurableTypes {
 *     injectable: Injectable;
 *     middleware: Middleware;
 *     middlewareParams: MiddlewareParams;
 *     middlewareParamMapping: typeof MIDDLEWARE_PARAM_MAPPING;
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

export type GetMiddleware = KustoConfigurableTypes extends { middleware: infer T } 
    ? T 
    : {};

export type GetMiddlewareParams = KustoConfigurableTypes extends { middlewareParams: infer T } 
    ? T 
    : {};

/**
 * Middleware parameter mapping type
 * Extracts the mapping interface from KustoConfigurableTypes
 */
export type GetMiddlewareParamMapping = KustoConfigurableTypes extends { middlewareParamMapping: infer T }
    ? T
    : {};

/**
 * Helper type to extract middleware parameter type for a specific middleware name
 * Step 1: Check if T is in the mapping
 * Step 2: Get the mapped parameter key
 * Step 3: Look up that key in MiddlewareParams
 */
export type GetMiddlewareParamFor<T extends string> = 
    T extends keyof GetMiddlewareParamMapping
        ? GetMiddlewareParamMapping[T] extends keyof GetMiddlewareParams
            ? GetMiddlewareParams[GetMiddlewareParamMapping[T]]
            : undefined
        : T extends keyof GetMiddlewareParams 
            ? GetMiddlewareParams[T] 
            : undefined;
    
export type GetRepositoryManager = KustoConfigurableTypes extends { repositoryTypeMap: infer T } 
    ? T 
    : {};
    
export type GetPrismaManager = KustoConfigurableTypes extends { databaseClientMap: infer T } 
    ? T 
    : {};
