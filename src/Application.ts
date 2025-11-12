import { Express } from 'express';
import { Server } from 'http';
import { Core, CoreConfig } from './Core';
import { log } from './external/winston';

/**
 * Application class - Simple and intuitive interface for the core functionality
 * 
 * @example
 * Basic usage with default paths (./app/routes, ./app/views, ./app/db, etc.)
 * ```typescript
 * import { Application } from '@kusto/core';
 * 
 * const app = new Application({
 *   port: 3000,
 *   host: '0.0.0.0'
 * });
 * 
 * await app.start();
 * ```
 * 
 * @example
 * With type inference for IntelliSense
 * ```typescript
 * import { Application } from '@kusto/core';
 * import type { Injectable } from './app/injectables/types/generated-injectable-types';
 * import type { RepositoryTypeMap } from './app/repositories/types/generated-repository-types';
 * import type { DatabaseClientMap } from './app/db/types/generated-db-types';
 * 
 * const app = new Application({
 *   port: 3000,
 *   basePath: './src/app',
 *   types: {
 *     injectable: {} as Injectable,
 *     repositories: {} as RepositoryTypeMap,
 *     databases: {} as DatabaseClientMap
 *   }
 * });
 * 
 * await app.start();
 * 
 * // Now in your routes, you'll get full IntelliSense:
 * // router.GET((req, res, injected, repo, db) => {
 * //   injected.authService  // ✅ Autocomplete works!
 * //   repo.getRepository('userRepository')  // ✅ Type-safe!
 * //   db.wrap('main')  // ✅ IntelliSense enabled!
 * // });
 * ```
 * 
 * @example
 * Custom base path (all sub-paths will be relative to basePath)
 * ```typescript
 * const app = new Application({
 *   basePath: './src/app',  // routes, views, db will be ./src/app/routes, etc.
 *   port: 3000
 * });
 * ```
 * 
 * @example
 * Custom individual paths
 * ```typescript
 * import { Application } from '@kusto/core';
 * import { envLoader } from './config/env';
 * 
 * const app = new Application({
 *   port: parseInt(envLoader.get('PORT') || '3000'),
 *   host: envLoader.get('HOST') || '0.0.0.0',
 *   routesPath: './src/app/routes',      // Custom route path
 *   viewsPath: './src/app/views',        // Custom view path
 *   dbPath: './src/app/db',              // Custom db path
 *   viewEngine: 'ejs',
 *   trustProxy: true
 * });
 * 
 * await app.start();
 * ```
 * 
 * @example
 * Using environment variables for paths
 * ```typescript
 * const app = new Application({
 *   port: parseInt(process.env.PORT || '3000'),
 *   basePath: process.env.APP_BASE_PATH,    // Optional
 *   routesPath: process.env.ROUTES_PATH,    // Optional
 *   dbPath: process.env.DB_PATH             // Optional
 * });
 * ```
 */
export class Application {
    private core: Core;
    private config: Partial<CoreConfig>;

    constructor(config?: Partial<CoreConfig>) {
        this.core = Core.getInstance();
        this.config = config || {};
    }    
    
    /**
     * Initialize and start the application
     */
    public async start(): Promise<Server> {
        try {
            log.Info('🚀 Starting application...');
            
            // Initialize core with configuration (now async)
            await this.core.initialize(this.config);
            
            // Start server
            const server = await this.core.start(this.config.port, this.config.host);
            
            return server;
        } catch (error) {
            log.Error('Failed to start application', { error });
            throw error;
        }
    }
    
    /**
     * Stop the application gracefully
     */
    public async stop(): Promise<void> {
        const stack = new Error().stack;
        log.Debug('🔍 stop() method called', { stack });
        log.Info('🛑 Stopping application...');
        await this.core.stop();
        log.Info('Application stopped successfully');
    }

    /**
     * Restart the application
     */
    public async restart(): Promise<Server> {
        log.Info('🔄 Restarting application...');
        await this.stop();
        return this.start();
    }

    /**
     * Get the Express app instance
     */
    public get express(): Express {
        return this.core.app;
    }

    /**
     * Get the HTTP server instance
     */
    public get server(): Server | undefined {
        return this.core.server;
    }

    /**
     * Get current configuration
     */
    public get configuration(): Required<CoreConfig> {
        return this.core.config;
    }    /**
     * Check if application is running
     */
    public get isRunning(): boolean {
        return this.core.isRunning;
    }

    /**
     * Add custom middleware to the Express app
     */
    public use(...handlers: any[]): this {
        this.core.app.use(...handlers);
        return this;
    }

    /**
     * Get application health status
     */
    public getHealthStatus() {
        return {
            status: this.isRunning ? 'healthy' : 'stopped',
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: process.version,
            config: this.configuration
        };
    }
}

/**
 * Quick start function for simple use cases
 */
export function createApplication(config?: Partial<CoreConfig>): Application {
    return new Application(config);
}

/**
 * Legacy support for existing initExpressCore_V1 function
 * @deprecated Use Application class instead
 */
export function initExpressCore_V1(app: Express): void {
    log.Warn('initExpressCore_V1 is deprecated. Use Application class instead.');
    
    const core = Core.getInstance();
    
    // Initialize core without starting server (for legacy compatibility)
    core.initialize();
}
