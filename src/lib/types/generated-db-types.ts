// Auto-generated file - Do not edit manually
// Generated from src/app/db folder structure

/**
 * Import actual Prisma client types from each database
 */
// type TemporaryClient = typeof import('@app/db/temporary/client')['PrismaClient'];

/**
 * Instantiated client types
 */
// type TemporaryInstance = InstanceType<TemporaryClient>;

/**
 * Type mapping for database names to their corresponding Prisma client instances
 * 
 * This interface is designed to be augmented by the consuming project via module augmentation.
 * Users should create a `kusto-types.d.ts` file in their project to extend this interface.
 * 
 * @example
 * ```typescript
 * // In your project's kusto-types.d.ts:
 * import { PrismaClient } from '@prisma/client';
 * 
 * declare module 'kusto-framework-core' {
 *   interface DatabaseClientMap {
 *     default: PrismaClient;
 *     analytics: AnalyticsPrismaClient;
 *   }
 * }
 * ```
 */
export interface DatabaseClientMap {
  // This interface is intentionally empty and should be extended via module augmentation
}

/**
 * Allow additional databases through index signature
 */
export interface DatabaseClientMapExtended extends DatabaseClientMap {
  [key: string]: any;
}

/**
 * Enhanced client type that preserves actual Prisma client type information
 */
export type DatabaseClientType<T extends string> = T extends keyof DatabaseClientMap 
  ? DatabaseClientMap[T] 
  : any;

/**
 * Type helper for extracting client type from database name
 * Use this when you need to get the client type for a specific database
 */
export type GetDatabaseClient<T extends string> = T extends keyof DatabaseClientMap
  ? DatabaseClientMap[T]
  : any;

/**
 * Valid database names
 */
export type DatabaseName = keyof DatabaseClientMap;

/**
 * Database names as Union type
 */
export type DatabaseNamesUnion = keyof DatabaseClientMap | string;

/**
 * Method overloads for getWrap
 */
export interface PrismaManagerWrapOverloads {
  // getWrap(databaseName: 'temporary'): TemporaryInstance;
  getWrap<TDbName extends keyof DatabaseClientMap>(databaseName: TDbName): DatabaseClientMap[TDbName];
  getWrap<TDbName extends string>(databaseName: TDbName): any;
}

/**
 * Method overloads for getClient
 */
export interface PrismaManagerClientOverloads {
  // getClient(databaseName: 'temporary'): Promise<TemporaryInstance>;
  getClient<TDbName extends keyof DatabaseClientMap>(databaseName: TDbName): Promise<DatabaseClientMap[TDbName]>;
  getClient<TDbName extends string>(databaseName: TDbName): Promise<any>;
}


/**
 * Extend PrismaManager class with proper method overloads
 */
declare module '../prismaManager' {
  interface PrismaManager {
  // getWrap(databaseName: 'temporary'): TemporaryInstance;
  // getClient(databaseName: 'temporary'): Promise<TemporaryInstance>;
  }
}
