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
  const databaseNamesUnion = dbFolders.map(dbName => `'${dbName}'`).join(' | ');
  
  // Generate method overloads
  const methodOverloads = dbFolders.map(dbName => 
    `  getWrap(databaseName: '${dbName}'): ${capitalize(dbName)}Instance;`
  ).join('\n');

  const getClientOverloads = dbFolders.map(dbName => 
    `  getClient(databaseName: '${dbName}'): Promise<${capitalize(dbName)}Instance>;`
  ).join('\n');

  // Generate PrismaManager class extension with proper overloads
  const classExtension = `
/**
 * Extend PrismaManager class with proper method overloads
 */
declare module 'kusto-framework-core' {
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
 * Type mapping for database names to their corresponding Prisma client instances
 */
export interface DatabaseClientMap {
${clientMapEntries}
  [key: string]: any; // Allow for additional databases
}

/**
 * Enhanced client type that preserves actual Prisma client type information
 */
export type DatabaseClientType<T extends string> = T extends keyof DatabaseClientMap 
  ? DatabaseClientMap[T] 
  : any;

/**
 * Valid database names
 */
export type DatabaseName = keyof DatabaseClientMap;

/**
 * Database names as Union type
 */
export type DatabaseNamesUnion = ${databaseNamesUnion};

/**
 * Method overloads for getWrap
 */
export interface PrismaManagerWrapOverloads {
${methodOverloads}
  getWrap<T extends string>(databaseName: T): DatabaseClientType<T>;
}

/**
 * Method overloads for getClient
 */
export interface PrismaManagerClientOverloads {
${getClientOverloads}
  getClient<T = any>(databaseName: string): Promise<T>;
}

${classExtension}
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
