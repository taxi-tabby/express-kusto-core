// Auto-generated file - DO NOT EDIT MANUALLY
// Generated on: 2025-09-04T05:04:19.860Z
// Source: src/app/repos/

// Repository type map for getRepository return types (empty - no repositories found)
export interface RepositoryTypeMap {
  // No repository files found
  // Add TypeScript files ending with .repository.ts to src/app/repos/ and regenerate types
}

// Repository registry for dynamic loading (empty)
export const REPOSITORY_REGISTRY = {
  // No repositories available
} as const;

// Repository names type
// Allows string when no repositories are registered to support user project repositories
export type RepositoryName = keyof typeof REPOSITORY_REGISTRY extends never ? string : keyof typeof REPOSITORY_REGISTRY;

// Helper type for getting repository type by name
// Returns 'any' instead of 'never' when repository type is not found to allow user project types
export type GetRepositoryType<T extends RepositoryName> = T extends keyof RepositoryTypeMap ? RepositoryTypeMap[T] : any;
