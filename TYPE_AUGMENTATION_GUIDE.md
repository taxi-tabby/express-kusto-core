# Type Augmentation Guide

이 가이드는 `kusto-framework-core`에서 타입 추론을 활성화하는 방법을 설명합니다.

## 문제

핸들러에서 `injected`, `repo`, `db` 매개변수의 타입이 `any`로 표시됩니다:

```typescript
router.GET((req, res, injected, repo, db) => {
    // injected: any
    // repo: any  
    // db: any
});
```

## 해결 방법

프로젝트에 타입 확장(Module Augmentation) 파일을 생성하여 자동 생성된 타입을 연결해야 합니다.

### 1. 타입 정의 파일 생성

프로젝트 루트에 `src/types/kusto-types.d.ts` 파일을 생성합니다:

```typescript
// src/types/kusto-types.d.ts

import type { Injectable } from '../core/generated-injectable-types';
import type { RepositoryTypeMap } from '../core/generated-repository-types';
import type { DatabaseClientMap } from '../core/generated-db-types';

declare module 'kusto-framework-core' {
  interface KustoConfigurableTypes {
    Injectable: Injectable;
    RepositoryTypeMap: RepositoryTypeMap;
    DatabaseClientMap: DatabaseClientMap;
  }
}
```

### 2. tsconfig.json 확인

`tsconfig.json`에서 다음을 확인하세요:

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "types": []
  },
  "include": [
    "src/**/*"
  ]
}
```

### 3. IDE 재시작

파일을 생성한 후:
1. TypeScript 서버 재시작: VS Code에서 `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. 또는 VS Code 완전 재시작

## 결과

이제 핸들러에서 모든 타입이 자동으로 추론됩니다:

```typescript
router.GET((req, res, injected, repo, db) => {
    // injected: Injectable (자동 완성 지원)
    // repo: RepositoryTypeMap (자동 완성 지원)
    // db: DatabaseClientMap (자동 완성 지원)
    
    injected.testMath.add(1, 2); // ✅ 타입 안전
    repo.user.findAll(); // ✅ 타입 안전
    db.main.user.findMany(); // ✅ 타입 안전
});
```

## 주의사항

### 파일 위치가 중요합니다

- `generated-injectable-types.ts`는 `src/core/`에 있어야 합니다
- `generated-repository-types.ts`는 `src/core/`에 있어야 합니다  
- `generated-db-types.ts`는 `src/core/`에 있어야 합니다
- `kusto-types.d.ts`는 `src/types/`에 있어야 합니다

경로가 다르면 import 경로를 수정하세요:

```typescript
// 예: core 폴더가 다른 위치에 있는 경우
import type { Injectable } from '../../generated/generated-injectable-types';
```

### TypeScript 컴파일러가 파일을 찾지 못하는 경우

1. `tsconfig.json`의 `include` 배열에 타입 파일이 포함되었는지 확인
2. `.d.ts` 파일은 반드시 `.d.ts` 확장자를 사용해야 함 (`.ts`가 아님)
3. VS Code를 재시작하거나 TypeScript 서버를 재시작

### 여전히 작동하지 않는 경우

디버깅 단계:

```typescript
// 1. 생성된 타입 파일을 직접 import해서 확인
import { Injectable } from '../core/generated-injectable-types';
type Test = Injectable; // 타입이 보이는지 확인

// 2. Module augmentation 없이 직접 사용
import type { HandlerFunction } from 'kusto-framework-core';
import type { KustoConfigurableTypes } from 'kusto-framework-core';
import type { Injectable } from '../core/generated-injectable-types';

type MyTypes = KustoConfigurableTypes & {
  Injectable: Injectable;
};

const handler: HandlerFunction<MyTypes> = (req, res, injected, repo, db) => {
  // 이제 타입이 보여야 함
};
```

## 자동 생성 스크립트

타입 파일은 다음 스크립트로 자동 생성됩니다:

```bash
# Injectable 타입 생성
node src/scripts/generate-injectable-types.js

# Repository 타입 생성  
node src/scripts/generate-repository-types.js

# Database 타입 생성
node src/scripts/generate-db-types.js
```

`package.json`에 스크립트를 추가하는 것을 권장합니다:

```json
{
  "scripts": {
    "generate:types": "node src/scripts/generate-injectable-types.js && node src/scripts/generate-repository-types.js && node src/scripts/generate-db-types.js"
  }
}
```
