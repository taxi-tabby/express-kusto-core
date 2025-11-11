# kusto-core

Express.js core library with Prisma integration, validation, and schema API support.

## Installation

```bash
npm install kusto-core
```

## Features

- 🚀 Express.js application wrapper with enhanced functionality
- 🔄 Prisma ORM integration
- ✅ Request/Response validation system
- 📝 Schema API with automatic documentation
- 🔐 Built-in error handling and formatting
- 📊 Winston logging integration
- 🛠️ Environment configuration loader

## Quick Start

```typescript
import { createApplication, Core } from 'kusto-core';

// Initialize core
const core = new Core({
  basePath: __dirname,
  envPath: '.env'
});

// Create application
const app = createApplication(core, {
  port: 3000,
  cors: true
});

app.listen();
```

## Core Exports

### Application & Core

- `Core` - Core configuration and initialization
- `Application` - Express application wrapper
- `createApplication` - Factory function for creating applications
- `initExpressCore_V1` - Legacy initialization function

### Validation System

```typescript
import { Validator, RequestHandler, withValidation } from 'kusto-core';

const schema = {
  name: { type: 'string', required: true },
  age: { type: 'number', min: 0 }
};

const handler = withValidation({
  body: schema
}, async (req, res) => {
  // req.body is validated and typed
  res.json({ success: true });
});
```

### Schema API (Development Mode)

- `CrudSchemaRegistry` - CRUD schema registration
- `PrismaSchemaAnalyzer` - Prisma schema analysis
- `SchemaApiRouter` - API router for schema endpoints
- `SchemaApiSetup` - Schema API setup utilities
- `SchemaApiDebugger` - Debugging tools for schema API

### Utilities

- `EnvironmentLoader` - Load and validate environment variables
- `ErrorFormatter` - Format errors consistently
- `ExpressRouter` - Enhanced Express router
- `log`, `logger` - Winston logger instances

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run dev
```

## Publishing

```bash
# Build and publish
npm publish
```

## License

MIT

## Author

rkdmf0000@gmail.com
