import 'module-alias/register';

// ============================================
// Core exports
// ============================================
export { Core, CoreConfig } from './Core';
export { Application, createApplication, initExpressCore_V1 } from './Application';

// ============================================
// Database & Repository
// ============================================
export { BaseRepository } from './lib/baseRepository';
export { prismaManager } from './lib/prismaManager';
export { kustoManager } from './lib/kustoManager';
export { repositoryManager } from './lib/repositoryManager';
export { TransactionCommitManager } from './lib/transactionCommitManager';

// ============================================
// CRUD & Schema
// ============================================
export { CrudSchemaRegistry } from './lib/crudSchemaRegistry';
export * from './lib/crudSchemaTypes';
export * from './lib/crudHelpers';
export { PrismaSchemaAnalyzer } from './lib/prismaSchemaAnalyzer';
export { SchemaApiRouter } from './lib/schemaApiRouter';
export { SchemaApiSetup } from './lib/schemaApiSetup';
export { SchemaApiDebugger } from './lib/schemaApiDebugger';

// ============================================
// Routing & Middleware
// ============================================
export { ExpressRouter } from './lib/expressRouter';
export { default as loadRoutes, clearCache } from './lib/loadRoutes_V6_Clean';
export * from './lib/middlewareHelpers';
export { 
    createDbConnectionMiddleware, 
    setupDbConnectionMiddleware, 
    dbHealthCheck,
    DbConnectionMiddlewareOptions 
} from './lib/dbConnectionMiddleware';
export { 
    serializationMiddleware, 
    setupGlobalBigIntSerialization, 
    setupExpressBigIntSerialization 
} from './lib/serializationMiddleware';
export { StaticFileMiddleware } from './lib/staticFileMiddleware';

// ============================================
// Validation & Request Handling
// ============================================
export { Validator, ValidationResult, ValidationError, Schema, FieldSchema } from './lib/validator';
export { 
    RequestHandler, 
    RequestConfig, 
    ResponseConfig, 
    ValidatedRequest,
    createValidatedHandler,
    withValidation,
    withFullValidation,
    sendSuccess,
    sendError
} from './lib/requestHandler';

// ============================================
// Error Handling
// ============================================
export { ErrorFormatter } from './lib/errorFormatter';
export { ErrorHandler } from './lib/errorHandler';
export * from './lib/errorCodes';

// ============================================
// Utilities
// ============================================
export { EnvironmentLoader } from './lib/environmentLoader';
export { DependencyInjector } from './lib/dependencyInjector';
export { DocumentationGenerator } from './lib/documentationGenerator';
export { 
    serialize, 
    serializeBigInt, 
    serializeDate, 
    serializePrismaDate, 
    jsonReplacer, 
    safeJsonResponse 
} from './lib/serializer';
export { TestGenerator } from './lib/testGenerator';
export { RelationshipConfigManager, RelationshipPattern, ManyToManyConfig } from './lib/relationshipConfig';

// ============================================
// Type Augmentation Support
// ============================================
export type { KustoConfigurableTypes, GetInjectable, GetRepositoryManager, GetPrismaManager } from './lib/types/configurable-types';

// ============================================
// External utilities
// ============================================
export { log, logger } from './external/winston';
export * from './external/util';

// ============================================
// Re-exported dependencies (middleware)
// ============================================
export { cors, cookieParser, helmet, bodyParser } from './lib/dependencies';
export type { CorsOptions, CorsOptionsDelegate, CorsRequest } from './lib/dependencies';
export type { CookieParseOptions } from './lib/dependencies';
export type { HelmetOptions } from './lib/dependencies';

// ============================================
// Build & Generation Scripts
// ============================================
export * as scripts from './scripts';

// ============================================
// Legacy singleton (deprecated)
// ============================================
export { default as expressApp } from './lib/expressAppSingleton';
export { default as core } from './Core';

// ============================================
// Default export for CommonJS compatibility
// ============================================
import { Core } from './Core';
import { Application, createApplication, initExpressCore_V1 } from './Application';
import { BaseRepository } from './lib/baseRepository';
import { prismaManager } from './lib/prismaManager';
import { kustoManager } from './lib/kustoManager';
import { repositoryManager } from './lib/repositoryManager';
import { TransactionCommitManager } from './lib/transactionCommitManager';
import { CrudSchemaRegistry } from './lib/crudSchemaRegistry';
import { PrismaSchemaAnalyzer } from './lib/prismaSchemaAnalyzer';
import { SchemaApiRouter } from './lib/schemaApiRouter';
import { SchemaApiSetup } from './lib/schemaApiSetup';
import { SchemaApiDebugger } from './lib/schemaApiDebugger';
import { ExpressRouter } from './lib/expressRouter';
import loadRoutes from './lib/loadRoutes_V6_Clean';
import { createDbConnectionMiddleware, setupDbConnectionMiddleware, dbHealthCheck } from './lib/dbConnectionMiddleware';
import { serializationMiddleware, setupGlobalBigIntSerialization, setupExpressBigIntSerialization } from './lib/serializationMiddleware';
import { StaticFileMiddleware } from './lib/staticFileMiddleware';
import { Validator } from './lib/validator';
import { 
    RequestHandler,
    createValidatedHandler,
    withValidation,
    withFullValidation,
    sendSuccess,
    sendError
} from './lib/requestHandler';
import { ErrorFormatter } from './lib/errorFormatter';
import { ErrorHandler } from './lib/errorHandler';
import { EnvironmentLoader } from './lib/environmentLoader';
import { DependencyInjector } from './lib/dependencyInjector';
import { DocumentationGenerator } from './lib/documentationGenerator';
import { serialize, serializeBigInt, serializeDate, serializePrismaDate, jsonReplacer, safeJsonResponse } from './lib/serializer';
import { TestGenerator } from './lib/testGenerator';
import { RelationshipConfigManager } from './lib/relationshipConfig';
import { log, logger } from './external/winston';
import * as scripts from './scripts';

const KustoFramework = {
    // Core
    Core,
    Application,
    createApplication,
    initExpressCore_V1,
    
    // Database & Repository
    BaseRepository,
    prismaManager,
    kustoManager,
    repositoryManager,
    TransactionCommitManager,
    
    // CRUD & Schema
    CrudSchemaRegistry,
    PrismaSchemaAnalyzer,
    SchemaApiRouter,
    SchemaApiSetup,
    SchemaApiDebugger,
    
    // Routing & Middleware
    ExpressRouter,
    loadRoutes,
    createDbConnectionMiddleware,
    setupDbConnectionMiddleware,
    dbHealthCheck,
    serializationMiddleware,
    setupGlobalBigIntSerialization,
    setupExpressBigIntSerialization,
    StaticFileMiddleware,
    
    // Validation & Request Handling
    Validator,
    RequestHandler,
    createValidatedHandler,
    withValidation,
    withFullValidation,
    sendSuccess,
    sendError,
    
    // Error Handling
    ErrorFormatter,
    ErrorHandler,
    
    // Utilities
    EnvironmentLoader,
    DependencyInjector,
    DocumentationGenerator,
    serialize,
    serializeBigInt,
    serializeDate,
    serializePrismaDate,
    jsonReplacer,
    safeJsonResponse,
    TestGenerator,
    RelationshipConfigManager,
    
    // Logging
    log,
    logger,
    
    // Scripts
    scripts,
};

export default KustoFramework;