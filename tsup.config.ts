import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'express',
    '@prisma/client',
    'winston',
    'bcrypt',
    'jsonwebtoken',
    'multer',
    'cors',
    'helmet',
    'cookie-parser',
    'body-parser',
    'dotenv',
    'ejs',
    'archiver',
    'yauzl',
    'http-proxy-middleware',
    'html-to-image',
    'module-alias'
  ],
  bundle: true,
  skipNodeModulesBundle: true,
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, '.'),
      '@app': path.resolve(__dirname, 'src', 'app'),
      '@core': path.resolve(__dirname, 'src'),
      '@lib': path.resolve(__dirname, 'src', 'lib'),
      '@ext': path.resolve(__dirname, 'src', 'external'),
      '@db': path.resolve(__dirname, 'src', 'app', 'db'),
    };
  },
});
