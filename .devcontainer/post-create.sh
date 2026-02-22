#!/bin/bash
set -e

echo "=== Post-create setup ==="

# 1. Claude Code CLI 전역 설치
echo "[1/4] Claude Code CLI 설치..."
npm install -g @anthropic-ai/claude-code

# 2. npm 의존성 설치
echo "[2/4] npm install..."
npm install

# 3. Husky git hooks 활성화
echo "[3/4] Husky hooks 설정..."
npx husky

# 4. Python 의존성 (requirements.txt가 있으면)
if [ -f requirements.txt ]; then
  echo "[4/4] Python 패키지 설치..."
  pip install -r requirements.txt
else
  echo "[4/4] requirements.txt 없음, 건너뜀"
fi

echo "=== Setup 완료! ==="
echo ""
echo "사용 가능한 명령어:"
echo "  npm run dev          → Vite 개발 서버 (http://localhost:5173)"
echo "  npm run check-all    → 전체 검증 (format + typecheck + lint + test)"
echo "  claude               → Claude Code CLI"
echo "  noVNC 접속           → http://localhost:6080/vnc.html"
