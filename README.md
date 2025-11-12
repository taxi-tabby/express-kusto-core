# kusto-core

Express.js core library with Prisma integration, validation, and schema API support.

## Installation

```bash
npm install kusto-framework-core
```

## Quick Start

```typescript
import { Application } from 'kusto-framework-core';

const app = new Application({
    port: 3000,
    host: '0.0.0.0',
    routesPath: './src/app/routes',
    viewsPath: './src/app/views',
    dbPath: './src/app/db',
    viewEngine: 'ejs',
    trustProxy: true
});

await app.start();
```

## Type Inference for IntelliSense

To enable full type inference and autocomplete in your routes, pass the generated types to the Application config:

**Step 1: Start your application with types**

```typescript
import { Application } from 'kusto-framework-core';
import type { Injectable } from './app/injectables/types/generated-injectable-types';
import type { RepositoryTypeMap } from './app/repositories/types/generated-repository-types';
import type { DatabaseClientMap } from './app/db/types/generated-db-types';

const app = new Application({
    port: 3000,
    basePath: './src/app',
    types: {
        injectable: {} as Injectable,
        repositories: {} as RepositoryTypeMap,
        databases: {} as DatabaseClientMap
    }
});

await app.start();
```

**Step 2: Enjoy full IntelliSense in your routes!**

```typescript
import { ExpressRouter } from 'kusto-framework-core';

const router = new ExpressRouter();

router.GET((req, res, injected, repo, db) => {
    // ✅ Full autocomplete for your injectable modules
    const authService = injected.authService;
    const emailService = injected.emailService;
    
    // ✅ Type-safe repository access
    const userRepo = repo.getRepository('userRepository');
    const postRepo = repo.getRepository('postRepository');
    
    // ✅ Type-safe database access
    const mainDb = db.wrap('main');
    const analyticsDb = db.wrap('analytics');
    
    // All with full IntelliSense! 🎉
});
```

### Alternative: Type Augmentation (Optional)

If you prefer not to pass types every time, you can use module augmentation:

**`src/types/kusto-augmentation.d.ts`:**

```typescript
import type { Injectable } from '../app/injectables/types/generated-injectable-types';
import type { RepositoryTypeMap } from '../app/repositories/types/generated-repository-types';
import type { DatabaseClientMap } from '../app/db/types/generated-db-types';

declare module 'kusto-framework-core' {
  interface KustoConfigurableTypes {
    Injectable: Injectable;
    RepositoryTypeMap: RepositoryTypeMap;
    DatabaseClientMap: DatabaseClientMap;
  }
}
```

Then types will work globally without passing them to Application.

## Configuration

### Path Configuration

The Application class accepts the following path configurations:

| Property | Description | Default | Runtime Configurable |
|----------|-------------|---------|---------------------|
| `basePath` | Base path for the application | `'./app'` | ✅ Yes |
| `routesPath` | Path to routes directory | `basePath + '/routes'` | ✅ Yes |
| `viewsPath` | Path to views directory | `basePath + '/views'` | ✅ Yes |
| `dbPath` | Path to database schemas (Prisma) | `basePath + '/db'` | ✅ Yes |
| `injectablesPath` | Path to injectable modules | `basePath + '/injectables'` | ⚠️ Build-time only* |
| `repositoriesPath` | Path to repository classes | `basePath + '/repositories'` | ⚠️ Build-time only* |

\* *Injectable modules and repositories are registered at build time via code generation scripts. To change these paths, modify the respective generation scripts in `src/scripts/`.*

### Server Configuration

| Property | Description | Default |
|----------|-------------|---------|
| `port` | Server port | `3000` |
| `host` | Server host | `'0.0.0.0'` |
| `viewEngine` | Template engine | `'ejs'` |
| `trustProxy` | Trust proxy headers | `true` |

## Examples

### Using Environment Variables

```typescript
import { Application } from 'kusto-framework-core';
import { config } from 'dotenv';

config();

const app = new Application({
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || '0.0.0.0',
    basePath: process.env.APP_BASE_PATH || './src/app',
    routesPath: process.env.ROUTES_PATH || './src/app/routes',
    dbPath: process.env.DB_PATH || './src/app/db'
});

await app.start();
```

### Custom Configuration Loader

```typescript
import { Application } from 'kusto-framework-core';
import { envLoader } from './config/env';

const app = new Application({
    port: parseInt(envLoader.get('PORT') || '3000'),
    host: envLoader.get('HOST') || '0.0.0.0',
    routesPath: './src/app/routes',
    viewsPath: './src/app/views',
    dbPath: './src/app/db',
    viewEngine: 'ejs',
    trustProxy: true
});

await app.start();
```

## Features

- 🚀 Express.js integration
- 🗄️ Multi-database Prisma support
- ✅ Built-in validation
- 📝 Auto-generated documentation
- 🔧 Dependency injection
- 📦 Repository pattern support
- 🎯 TypeScript first
- 🔍 Full IntelliSense support with type augmentation

## NOTICE
In develop


## License

MIT

## Author

rkdmf0000@gmail.com
