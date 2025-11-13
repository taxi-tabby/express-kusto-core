/**
 * Handler function types that will be properly typed in consuming projects
 * 
 * Usage in consuming project:
 * 1. Create src/kusto-handlers.ts:
 * ```typescript
 * import type { Injectable } from './core/generated-injectable-types';
 * import type { RepositoryTypeMap } from './core/generated-repository-types';
 * import type { DatabaseClientMap } from './core/generated-db-types';
 * import type { Request, Response, NextFunction } from 'express';
 * import type { ValidatedRequest, RequestConfig } from 'kusto-framework-core';
 * 
 * export type TypedHandler = (
 *   req: Request,
 *   res: Response,
 *   injected: Injectable,
 *   repo: RepositoryTypeMap,
 *   db: DatabaseClientMap
 * ) => void | Promise<void>;
 * 
 * export type TypedValidatedHandler<TConfig extends RequestConfig = RequestConfig> = (
 *   req: ValidatedRequest<TConfig>,
 *   res: Response,
 *   injected: Injectable,
 *   repo: RepositoryTypeMap,
 *   db: DatabaseClientMap
 * ) => void | Promise<void>;
 * 
 * export type TypedMiddleware = (
 *   req: Request,
 *   res: Response,
 *   next: NextFunction,
 *   injected: Injectable,
 *   repo: RepositoryTypeMap,
 *   db: DatabaseClientMap
 * ) => void | Promise<void>;
 * ```
 * 
 * 2. Use in routes:
 * ```typescript
 * import { ExpressRouter } from 'kusto-framework-core';
 * import type { TypedHandler } from '../../kusto-handlers';
 * 
 * const router = new ExpressRouter();
 * 
 * const handler: TypedHandler = (req, res, injected, repo, db) => {
 *   // Full type inference here!
 *   injected.testMath.add(1, 2);
 *   repo.user.findAll();
 *   db.main.user.findMany();
 * };
 * 
 * router.GET(handler);
 * ```
 */

import type { Request, Response, NextFunction } from 'express';
import type { ValidatedRequest, RequestConfig } from '../requestHandler';

/**
 * Generic handler types - override these in consuming project
 */
export type GenericInjectable = any;
export type GenericRepositoryMap = any;
export type GenericDatabaseMap = any;

/**
 * Base handler function type
 */
export type BaseHandlerFunction = (
    req: Request,
    res: Response,
    injected: GenericInjectable,
    repo: GenericRepositoryMap,
    db: GenericDatabaseMap
) => void | Promise<void>;

/**
 * Base validated handler function type
 */
export type BaseValidatedHandlerFunction<TConfig extends RequestConfig = RequestConfig> = (
    req: ValidatedRequest<TConfig>,
    res: Response,
    injected: GenericInjectable,
    repo: GenericRepositoryMap,
    db: GenericDatabaseMap
) => void | Promise<void>;

/**
 * Base middleware handler function type
 */
export type BaseMiddlewareHandlerFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
    injected: GenericInjectable,
    repo: GenericRepositoryMap,
    db: GenericDatabaseMap
) => void | Promise<void>;

/**
 * Base validated middleware handler function type
 */
export type BaseValidatedMiddlewareHandlerFunction<TConfig extends RequestConfig = RequestConfig> = (
    req: ValidatedRequest<TConfig>,
    res: Response,
    next: NextFunction,
    injected: GenericInjectable,
    repo: GenericRepositoryMap,
    db: GenericDatabaseMap
) => void | Promise<void>;
