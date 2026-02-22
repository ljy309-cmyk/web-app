#!/bin/bash
set -e

echo "=== Post-create setup ==="

# 1. npm 의존성 설치
echo "[1/3] npm install..."
npm install

# 2. Husky git hooks 활성화
echo "[2/3] Husky hooks 설정..."
npx husky

# 3. Python 의존성 (requirements.txt가 있으면)
if [ -f requirements.txt ]; then
  echo "[3/3] Python 패키지 설치..."
  pip install -r requirements.txt
else
  echo "[3/3] requirements.txt 없음, 건너뜀"
fi

echo "=== Setup 완료! ==="
echo ""
echo "사용 가능한 명령어:"
echo "  npm run dev          → Vite 개발 서버 (http://localhost:5173)"
echo "  npm run check-all    → 전체 검증 (format + typecheck + lint + test)"
echo "  noVNC 접속           → http://localhost:6080/vnc.html"
