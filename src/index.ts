import 'module-alias/register';

// Core exports
export { Core, CoreConfig } from './Core';
export { Application, createApplication, initExpressCore_V1 } from './Application';

// Environment and utilities
export { EnvironmentLoader } from './lib/environmentLoader';
export { ErrorFormatter } from './lib/errorFormatter';

// Router and utilities
export { ExpressRouter } from './lib/expressRouter';
export { log, logger } from './external/winston';
export * from './external/util';

// Schema API (개발 모드 전용)
export { CrudSchemaRegistry } from './lib/crudSchemaRegistry';
export { PrismaSchemaAnalyzer } from './lib/prismaSchemaAnalyzer';
export { SchemaApiRouter } from './lib/schemaApiRouter';
export { SchemaApiSetup } from './lib/schemaApiSetup';
export { SchemaApiDebugger } from './lib/schemaApiDebugger';
export * from './lib/crudSchemaTypes';

// Validation system
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


// Legacy singleton for backward compatibility
export { default as expressApp } from './lib/expressAppSingleton';

// Re-export for convenience
export { default as core } from './Core';

// Default export for CommonJS compatibility
import { Core } from './Core';
import { Application, createApplication, initExpressCore_V1 } from './Application';
import { EnvironmentLoader } from './lib/environmentLoader';
import { ErrorFormatter } from './lib/errorFormatter';
import { ExpressRouter } from './lib/expressRouter';
import { log, logger } from './external/winston';
import { CrudSchemaRegistry } from './lib/crudSchemaRegistry';
import { PrismaSchemaAnalyzer } from './lib/prismaSchemaAnalyzer';
import { SchemaApiRouter } from './lib/schemaApiRouter';
import { SchemaApiSetup } from './lib/schemaApiSetup';
import { SchemaApiDebugger } from './lib/schemaApiDebugger';
import { Validator } from './lib/validator';
import { kustoManager } from './lib/kustoManager';


import { 
    RequestHandler,
    createValidatedHandler,
    withValidation,
    withFullValidation,
    sendSuccess,
    sendError
} from './lib/requestHandler';

const KustoFramework = {
    Core,
    Application,
    createApplication,
    initExpressCore_V1,
    EnvironmentLoader,
    ErrorFormatter,
    ExpressRouter,
    log,
    logger,
    CrudSchemaRegistry,
    PrismaSchemaAnalyzer,
    SchemaApiRouter,
    SchemaApiSetup,
    SchemaApiDebugger,
    Validator,
    RequestHandler,
    createValidatedHandler,
    withValidation,
    withFullValidation,
    sendSuccess,
    sendError,
    kustoManager
};

export default KustoFramework;

