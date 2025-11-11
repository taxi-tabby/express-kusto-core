# Publishing Guide

## Before Publishing

1. 빌드 확인:
```bash
npm run build
```

2. 패키지 내용 확인:
```bash
npm pack --dry-run
```

3. 버전 업데이트:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## Publishing to NPM

1. NPM 로그인 (이미 완료):
```bash
npm login
```

2. 배포:
```bash
npm publish
```

## Publishing to GitHub Packages

1. `.npmrc` 파일 생성:
```
@taxi-tabby:registry=https://npm.pkg.github.com
```

2. package.json에 추가:
```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

3. GitHub Token으로 로그인 후 배포:
```bash
npm publish
```

## 패키지 정보

- **이름**: kusto-core
- **버전**: 1.0.0
- **크기**: ~626 KB (압축)
- **포함 파일**:
  - dist/ (빌드된 파일)
  - README.md
  - LICENSE
  - package.json

## 타입 정의

패키지는 완전한 TypeScript 타입 정의를 포함합니다:
- CommonJS: `dist/index.d.ts`
- ESM: `dist/index.d.mts`

## 모듈 형식

- CommonJS: `dist/index.js`
- ES Module: `dist/index.mjs`
- TypeScript 소스맵 포함
