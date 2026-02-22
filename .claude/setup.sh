#!/bin/bash
# Claude Code SessionStart hook
# Codespaces / Dev Container 환경에서 Claude Code 세션 시작 시 자동 실행

set -e

echo "🔧 Claude Code 환경 준비 중..."

# node_modules 확인 및 설치
if [ ! -d "node_modules" ]; then
  echo "📦 npm 의존성 설치 중..."
  npm install
fi

# TypeScript 빌드 체크
echo "🔍 TypeScript 타입 체크..."
npx tsc --noEmit 2>/dev/null || echo "⚠️ TypeScript 에러가 있습니다. 확인해주세요."

echo "✅ Claude Code 환경 준비 완료!"
echo ""
echo "사용 가능한 명령어:"
echo "  npm run dev          → 개발 서버"
echo "  npm run test         → 단위 테스트"
echo "  npm run check-all    → 전체 검증"
echo "  npm run e2e          → E2E 테스트"
