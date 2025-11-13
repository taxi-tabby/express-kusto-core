const fs = require('fs');
const path = require('path');
const { analyzeWordType, smartSplit, toCamelCase, toPascalCase } = require('./fnCamelConvert');

/**
 * Recursively scan directory for repository TypeScript files
 */
function scanDirectory(dirPath, basePath = '', repositories = []) {
	if (!fs.existsSync(dirPath)) {
		return repositories;
	}

	const items = fs.readdirSync(dirPath, { withFileTypes: true });

	for (const item of items) {
		const itemPath = path.join(dirPath, item.name);
		const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

		if (item.isDirectory()) {
			// Recursively scan subdirectories
			scanDirectory(itemPath, relativePath, repositories);
		} else if (item.isFile() && item.name.endsWith('.repository.ts')) {
			// Only include *.repository.ts files
			const fileName = path.basename(item.name, '.ts');
			const cleanFileName = fileName.replace('.repository', ''); // Remove .repository suffix
			const repositoryPath = basePath ? `${basePath}/${fileName}` : fileName;

			// Generate property name by converting path to camelCase (without Repository suffix)
			const propertyName = basePath
				? toCamelCase(`${basePath.replace(/\//g, '_')}_${cleanFileName}`)
				: toCamelCase(cleanFileName);

			// Generate unique import alias using full path
			const importAlias = basePath
				? toPascalCase(`${basePath.replace(/\//g, '_')}_${cleanFileName}_Repository`)
				: toPascalCase(`${cleanFileName}_Repository`);

			repositories.push({
				repositoryPath,
				propertyName,
				className: importAlias, // Use unique alias as className
				importPath: repositoryPath
			});
		}
	}

	return repositories;
}

/**
 * Generate TypeScript types for repository classes
 * @param {string} repositoriesPath - Custom path to repositories directory (optional)
 * @param {string} outputDir - Custom output directory for generated types (optional, default: 'src/core')
 */
function generateRepositoryTypes(repositoriesPath, outputDir = 'src/core') {
	// Use custom path if provided, otherwise default to src/app/repos
	const reposPath = repositoriesPath 
		? path.join(process.cwd(), repositoriesPath)
		: path.join(process.cwd(), 'src', 'app', 'repos');

	if (!fs.existsSync(reposPath)) {
		console.log('Repository directory not found, creating default types...');
		generateDefaultTypes(outputDir);
		return;
	}

	// Recursively scan for all repository TypeScript files
	const repositories = scanDirectory(reposPath);

	console.log('Found repository files:', repositories.map(r => r.repositoryPath));

	if (repositories.length === 0) {
		generateDefaultTypes(outputDir);
		return;
	}

	// Calculate relative path from output directory to repositories directory
	const outputPath = path.join(process.cwd(), outputDir, 'generated-repository-types.ts');
	const outputDirPath = path.dirname(outputPath);
	const relativePathToRepos = path.relative(outputDirPath, reposPath).replace(/\\/g, '/');

	// Generate import statements (using relative paths from generated file location)
	const imports = repositories.map(repository =>
		`import ${repository.className} from '${relativePathToRepos}/${repository.importPath}';`
	).join('\n');

	// Generate repository type definitions
	const repositoryTypes = repositories.map(repository => {
		return `type ${repository.className}Type = InstanceType<typeof ${repository.className}>;`;
	}).join('\n');
	
	// Generate Repository type map (for getRepository return types)
	const repositoryTypeMap = repositories.map(repository =>
		`  '${repository.propertyName}': ${repository.className}Type;`
	).join('\n');

	// Generate repository registry for runtime loading (using relative paths)
	const repositoryRegistry = repositories.map(repository =>
		`  '${repository.propertyName}': () => import('${relativePathToRepos}/${repository.importPath}'),`
	).join('\n');

	const typeDefinition = `// Auto-generated file - DO NOT EDIT MANUALLY
// Source: ${repositoriesPath || 'src/app/repos'}

${imports}

// Repository type definitions
${repositoryTypes}

// Repository registry for dynamic loading
export const REPOSITORY_REGISTRY = {
${repositoryRegistry}
} as const;

/**
 * Augment kusto-framework-core module with actual repository types
 */
declare module 'kusto-framework-core' {
  // Repository type map for getRepository return types
  interface RepositoryTypeMap {
${repositoryTypeMap}
  }
}

// Repository names type
export type RepositoryName = keyof typeof REPOSITORY_REGISTRY;

// Helper type for getting repository type by name
export type GetRepositoryType<T extends RepositoryName> = T extends keyof import('kusto-framework-core').RepositoryTypeMap ? import('kusto-framework-core').RepositoryTypeMap[T] : never;
`;

	// Write the generated types to file
	// Ensure directory exists
	if (!fs.existsSync(outputDirPath)) {
		fs.mkdirSync(outputDirPath, { recursive: true });
	}

	fs.writeFileSync(outputPath, typeDefinition, 'utf8');
	console.log('Generated repository types:', outputPath);
}

/**
 * Generate default types when no repository files exist
 */
function generateDefaultTypes(outputDir = 'src/core') {
	const typeDefinition = `// Auto-generated file - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Source: src/app/repos/

// Repository registry for dynamic loading (empty)
export const REPOSITORY_REGISTRY = {
  // No repositories available
} as const;

/**
 * Augment kusto-framework-core module with repository types
 * Currently empty - add .repository.ts files to src/app/repos/ and regenerate types
 */
declare module 'kusto-framework-core' {
  // Repository type map for getRepository return types (empty - no repositories found)
  interface RepositoryTypeMap {
    // No repository files found
    // Add TypeScript files ending with .repository.ts to src/app/repos/ and regenerate types
  }
}

// Repository names type
export type RepositoryName = keyof typeof REPOSITORY_REGISTRY;

// Helper type for getting repository type by name
export type GetRepositoryType<T extends RepositoryName> = T extends keyof import('kusto-framework-core').RepositoryTypeMap ? import('kusto-framework-core').RepositoryTypeMap[T] : never;
`;

	const outputPath = path.join(process.cwd(), outputDir, 'generated-repository-types.ts');

	// Ensure directory exists
	const outputDirPath = path.dirname(outputPath);
	if (!fs.existsSync(outputDirPath)) {
		fs.mkdirSync(outputDirPath, { recursive: true });
	}

	fs.writeFileSync(outputPath, typeDefinition, 'utf8');
	console.log('Generated default repository types:', outputPath);
}

/**
 * Capitalize first letter of string
 */
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// Run the generator
if (require.main === module) {
	try {
		generateRepositoryTypes();
		console.log('Repository types generation completed successfully!');
	} catch (error) {
		console.error('Error generating repository types:', error);
		process.exit(1);
	}
}

module.exports = { generateRepositoryTypes };
