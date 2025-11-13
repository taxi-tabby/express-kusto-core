import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  // 모든 의존성을 번들에 포함 (external 제거 또는 최소화)
  external: [
    // Peer dependencies만 제외 (사용자 프로젝트에 이미 있을 것으로 예상)
    'express',
    '@prisma/client',
    '@types/express', // 타입 충돌 방지
    'module-alias', // ESM 환경에서 문제를 일으키므로 제외
  ],
  bundle: true,
  noExternal: [/.*/], // 모든 것을 번들링
  // CommonJS에서 default export 지원
  cjsInterop: true,
  shims: true,
});
