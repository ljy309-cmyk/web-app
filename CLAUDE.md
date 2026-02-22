# CLAUDE.md

## Project Overview

Superconductor Simulator Web App — BCS 이론 기반 초전도체 물리 시뮬레이션 웹 애플리케이션.
React + Vite + TypeScript로 구축되어 있으며, 물질 파라미터(디바이 온도, 전자 밀도, 커플링 상수)를
조절하여 초전도 현상을 시각적으로 탐구할 수 있습니다.

## Tech Stack

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + React Testing Library (unit), Playwright (E2E)
- **Linting**: ESLint + Prettier
- **Pre-commit**: Husky + lint-staged + commitlint

## Common Commands

```bash
npm run dev          # Vite 개발 서버 (http://localhost:5173)
npm run build        # TypeScript + Vite 프로덕션 빌드
npm run test         # Vitest 단위 테스트
npm run test:watch   # Vitest 감시 모드
npm run test:coverage # 커버리지 포함 테스트
npm run lint         # ESLint 검사
npm run typecheck    # TypeScript 타입 체크
npm run format       # Prettier 포매팅
npm run check-all    # 전체 검증 (format + typecheck + lint + test)
npm run e2e          # Playwright E2E 테스트
```

## Architecture

- `src/App.tsx` — 메인 컴포넌트, 시뮬레이션 상태 관리
- `src/components/` — UI 컴포넌트 (Header, ControlPanel, ExperimentChart)
- `src/utils/physics.ts` — BCS 이론 물리 계산 (순수 함수)
- `e2e/` — Playwright E2E 테스트
- `.devcontainer/` — Codespaces / Dev Container 설정

## Key Conventions

- 테스트 커버리지 100% 유지
- 커밋 메시지: Conventional Commits 형식 (commitlint 적용)
- 물리 계산 코드와 UI 코드 분리
- Korean 주석 사용
