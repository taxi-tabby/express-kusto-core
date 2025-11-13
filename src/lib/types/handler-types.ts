
import type { Request, Response, NextFunction } from 'express';
import type { ValidatedRequest, RequestConfig } from '../requestHandler';
import type { Injectable } from './generated-injectable-types';
import type { RepositoryTypeMap } from './generated-repository-types';
import type { KustoDbProxy } from '../kustoManager';

/**
 * Base handler function type
 */
export type BaseHandlerFunction = (
    req: Request,
    res: Response,
    injected: Injectable,
    repo: RepositoryTypeMap,
    db: KustoDbProxy
) => void | Promise<void>;

/**
 * Base validated handler function type
 */
export type BaseValidatedHandlerFunction<TConfig extends RequestConfig = RequestConfig> = (
    req: ValidatedRequest<TConfig>,
    res: Response,
    injected: Injectable,
    repo: RepositoryTypeMap,
    db: KustoDbProxy
) => void | Promise<void>;

/**
 * Base middleware handler function type
 */
export type BaseMiddlewareHandlerFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
    injected: Injectable,
    repo: RepositoryTypeMap,
    db: KustoDbProxy
) => void | Promise<void>;

/**
 * Base validated middleware handler function type
 */
export type BaseValidatedMiddlewareHandlerFunction<TConfig extends RequestConfig = RequestConfig> = (
    req: ValidatedRequest<TConfig>,
    res: Response,
    next: NextFunction,
    injected: Injectable,
    repo: RepositoryTypeMap,
    db: KustoDbProxy
) => void | Promise<void>;
