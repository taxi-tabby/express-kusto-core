const fs = require('fs');
const path = require('path');

/**
 * Generate TypeScript types based on databases in src/app/db folder
 */
function generateDatabaseTypes(dbPath = './src/app/db', outputDir = './src/core') {
  const dbPathAbsolute = path.join(process.cwd(), dbPath);
  const outputDirPath = path.join(process.cwd(), outputDir);
  const outputPath = path.join(outputDirPath, 'generated-db-types.ts');

  // Calculate relative path from output file to db directory
  const relativePathToDb = path.relative(outputDirPath, dbPathAbsolute).replace(/\\/g, '/');
  
  if (!fs.existsSync(dbPathAbsolute)) {
    console.error('Database directory not found:', dbPathAbsolute);
    return;
  }

  // Get all database folders
  const dbFolders = fs.readdirSync(dbPathAbsolute, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  console.log('Found databases:', dbFolders);

  // Generate type imports (using relative paths)
  const typeImports = dbFolders.map(dbName => 
    `type ${capitalize(dbName)}Client = typeof import('${relativePathToDb}/${dbName}/client')['PrismaClient'];`
  ).join('\n');

  // Generate instance types
  const instanceTypes = dbFolders.map(dbName => 
    `type ${capitalize(dbName)}Instance = InstanceType<${capitalize(dbName)}Client>;`
  ).join('\n');
  // Generate DatabaseClientMap interface
  const clientMapEntries = dbFolders.map(dbName => 
    `  ${dbName}: ${capitalize(dbName)}Instance;`
  ).join('\n');
  
  // Generate Union type for database names
  const databaseNamesUnion = dbFolders.length > 0 
    ? dbFolders.map(dbName => `'${dbName}'`).join(' | ')
    : 'string';
  
  // Generate DatabaseNamesUnion with fallback to string
  const databaseNamesUnionType = dbFolders.length > 0
    ? `keyof DatabaseClientMap | string`
    : `string`;
  
  // Generate method overloads
  const methodOverloads = dbFolders.map(dbName => 
    `  getWrap(databaseName: '${dbName}'): ${capitalize(dbName)}Instance;`
  ).join('\n');

  const getClientOverloads = dbFolders.map(dbName => 
    `  getClient(databaseName: '${dbName}'): Promise<${capitalize(dbName)}Instance>;`
  ).join('\n');

  // Generate generic method signatures with better type inference
  const genericWrapSignature = `  getWrap<TDbName extends keyof DatabaseClientMap>(databaseName: TDbName): DatabaseClientMap[TDbName];
  getWrap<TDbName extends string>(databaseName: TDbName): any;`;

  const genericClientSignature = `  getClient<TDbName extends keyof DatabaseClientMap>(databaseName: TDbName): Promise<DatabaseClientMap[TDbName]>;
  getClient<TDbName extends string>(databaseName: TDbName): Promise<any>;`;

  // Generate module augmentation for both DatabaseClientMap and PrismaManager
  const moduleAugmentation = `
/**
 * Augment kusto-framework-core module with actual database types
 */
declare module 'kusto-framework-core' {
  /**
   * Type mapping for database names to their corresponding Prisma client instances
   */
  interface DatabaseClientMap {
${clientMapEntries}
  }

  /**
   * Extend PrismaManager class with proper method overloads
   */
  interface PrismaManager {
${methodOverloads}
${getClientOverloads}
  }
}`;

  // Generate the complete type file
  const typeFileContent = `// Auto-generated file - Do not edit manually
// Generated from ${dbPath || 'src/app/db'} folder structure

/**
 * Import actual Prisma client types from each database
 */
${typeImports}

/**
 * Instantiated client types
 */
${instanceTypes}

/**
 * Enhanced client type that preserves actual Prisma client type information
 */
export type DatabaseClientType<T extends string> = T extends keyof import('kusto-framework-core').DatabaseClientMap 
  ? import('kusto-framework-core').DatabaseClientMap[T] 
  : any;

/**
 * Type helper for extracting client type from database name
 * Use this when you need to get the client type for a specific database
 */
export type GetDatabaseClient<T extends string> = T extends keyof import('kusto-framework-core').DatabaseClientMap
  ? import('kusto-framework-core').DatabaseClientMap[T]
  : any;

/**
 * Valid database names
 */
export type DatabaseName = keyof import('kusto-framework-core').DatabaseClientMap;

/**
 * Database names as Union type
 */
export type DatabaseNamesUnion = keyof import('kusto-framework-core').DatabaseClientMap | string;

${moduleAugmentation}
`;

  // Write the generated types to a file
  // Ensure directory exists
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true });
  }

  fs.writeFileSync(outputPath, typeFileContent);
  console.log('Generated database types at:', outputPath);

  return {
    dbFolders,
    outputPath
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Run if called directly
if (require.main === module) {
  try {
    generateDatabaseTypes();
  } catch (error) {
    console.error('Error generating database types:', error);
  }
}

module.exports = { generateDatabaseTypes };
