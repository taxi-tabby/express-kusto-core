/**
 * Re-export commonly used dependencies
 * This allows users to import these packages from kusto-framework-core
 * instead of installing them separately
 */

// Express middleware
export { default as cors } from 'cors';
export { default as cookieParser } from 'cookie-parser';
export { default as helmet } from 'helmet';
export { default as bodyParser } from 'body-parser';

// Re-export types
export type { CorsOptions, CorsOptionsDelegate, CorsRequest } from 'cors';
export type { CookieParseOptions } from 'cookie-parser';
export type { HelmetOptions } from 'helmet';
