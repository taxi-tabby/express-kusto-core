/**
 * Scripts utilities for kusto-framework-core
 * Programmatic access to build and generation scripts
 */

/**
 * Build routes - Scans and prepares route files for bundling
 */
export function buildRoutes(): void {
    const script = require('./build-routes');
    script.buildRoutes();
}

/**
 * Generate database types from Prisma schemas
 */
export function generateDatabaseTypes(): void {
    const script = require('./generate-db-types');
    script.generateDatabaseTypes();
}

/**
 * Generate injectable types for dependency injection
 */
export async function generateInjectableTypes(): Promise<void> {
    const script = require('./generate-injectable-types');
    await script.generateInjectableTypes();
}

/**
 * Generate repository types
 */
export function generateRepositoryTypes(): void {
    const script = require('./generate-repository-types');
    script.generateRepositoryTypes();
}

/**
 * Generate routes map for virtual file system
 */
export function generateRoutesMap(): void {
    const script = require('./generate-routes-map');
    script.generateRoutesMap();
}

/**
 * Utility functions from fnCamelConvert
 */
export function toCamelCase(str: string): string {
    const utils = require('./fnCamelConvert');
    return utils.toCamelCase(str);
}

export function toPascalCase(str: string): string {
    const utils = require('./fnCamelConvert');
    return utils.toPascalCase(str);
}

export function smartSplit(str: string): string[] {
    const utils = require('./fnCamelConvert');
    return utils.smartSplit(str);
}

export function analyzeWordType(word: string): string {
    const utils = require('./fnCamelConvert');
    return utils.analyzeWordType(word);
}
