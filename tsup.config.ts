import { defineConfig } from 'tsup';

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
});
