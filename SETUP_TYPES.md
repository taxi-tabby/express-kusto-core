# kusto-framework-core 타입 설정 가이드

## 문제
`kusto-framework-core` 패키지를 사용할 때 핸들러에서 `injected`, `repo`, `db`가 `{}`로 표시됩니다.

## ✅ 해결 방법 (Module Augmentation)

### 1단계: 타입 생성

생성 스크립트가 다음 파일들을 생성합니다:
- `generated-injectable-types.ts`
- `generated-repository-types.ts`
- `generated-db-types.ts`

### 2단계: Module Augmentation 파일 생성

**중요**: 생성된 타입 파일과 **같은 디렉토리**에 `kusto-types.d.ts` 생성:

```typescript
// kusto-types.d.ts (generated-*.ts 파일들과 같은 디렉토리!)
import type { Injectable } from './generated-injectable-types';
import type { RepositoryTypeMap } from './generated-repository-types';
import type { DatabaseClientMap } from './generated-db-types';

declare module 'kusto-framework-core' {
  interface KustoConfigurableTypes {
    Injectable: Injectable;
    RepositoryTypeMap: RepositoryTypeMap;
    DatabaseClientMap: DatabaseClientMap;
  }
}

export {};
```

### 3단계: TypeScript 서버 재시작

1. `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. 안 되면 VS Code 완전 재시작

### 4단계: 타입 확인

```typescript
// src/app/routes/test/route.ts
import { ExpressRouter } from 'kusto-framework-core';

const router = new ExpressRouter();

router.GET((req, res, injected, repo, db) => {
    // ✅ 완벽한 타입 추론!
    injected.testMath.add(1, 2);
    repo.user.findAll();
    db.main.user.findMany();
    
    res.json({ success: true });
});

export default router;
```

---

## 핵심 포인트

1. ✅ `kusto-types.d.ts`를 **생성된 파일과 같은 디렉토리**에 두세요
2. ✅ 상대 경로 import 사용 (`./generated-...`)
3. ✅ `export {};` 필수
4. ❌ 이 파일을 import/require 하지 마세요 (자동 인식됨)

---

## 문제 해결

### 타입이 여전히 `{}`로 표시되면

1. **파일 위치 확인**:
```
your-project/
├── generated-injectable-types.ts
├── generated-repository-types.ts  
├── generated-db-types.ts
└── kusto-types.d.ts  ← 같은 디렉토리!
```

2. **생성된 파일 내용 확인**:
```typescript
// generated-injectable-types.ts
export interface Injectable {
  testMath: TestMathModuleType;  // ← 실제 모듈들이 있어야 함
}
```

3. **tsconfig.json 확인**:
```json
{
  "include": [
    "**/*.ts",
    "**/*.d.ts"
  ]
}
```

4. **TypeScript 서버 재시작**: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

5. **VS Code 완전 재시작**
