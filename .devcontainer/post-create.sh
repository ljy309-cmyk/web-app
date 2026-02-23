#!/bin/bash
set -e

echo "=== Post-create setup ==="

# 1. Git 설정 - divergent branches 오류 방지
echo "[1/5] Git 설정..."
git config pull.rebase true
git config init.defaultBranch main

# origin/main fetch 및 origin/HEAD 설정
if git show-ref --verify --quiet refs/remotes/origin/main; then
  git remote set-head origin main 2>/dev/null || true
fi

# 최신 origin/main 가져오기
git fetch origin main 2>/dev/null || true

# master 브랜치 정리
if git show-ref --verify --quiet refs/heads/master; then
  CURRENT_BRANCH=$(git branch --show-current)
  if [ "$CURRENT_BRANCH" = "master" ]; then
    echo "  master → main 전환 (origin/main으로 리셋)..."
    git checkout -B main origin/main
    git branch -D master 2>/dev/null || true
  else
    echo "  불필요한 master 브랜치 삭제..."
    git branch -D master 2>/dev/null || true
  fi
fi

# main 브랜치를 origin/main과 강제 동기화
# (컨테이너 생성 시 로컬 main은 항상 origin/main과 일치해야 함)
if git show-ref --verify --quiet refs/remotes/origin/main; then
  CURRENT_BRANCH=$(git branch --show-current)
  if ! git show-ref --verify --quiet refs/heads/main; then
    echo "  main 브랜치 생성 (origin/main 기준)..."
    git branch main origin/main
  else
    echo "  main 브랜치를 origin/main으로 동기화..."
    if [ "$CURRENT_BRANCH" = "main" ]; then
      git reset --hard origin/main
    else
      git branch -f main origin/main
    fi
  fi
  git branch --set-upstream-to=origin/main main 2>/dev/null || true
fi

# 2. Claude Code CLI 전역 설치
echo "[2/5] Claude Code CLI 설치..."
npm install -g @anthropic-ai/claude-code

# 3. npm 의존성 설치
echo "[3/5] npm install..."
npm install

# 4. Husky git hooks 활성화
echo "[4/5] Husky hooks 설정..."
npx husky

# 5. Python 의존성 (requirements.txt가 있으면)
if [ -f requirements.txt ]; then
  echo "[5/5] Python 패키지 설치..."
  pip install -r requirements.txt
else
  echo "[5/5] requirements.txt 없음, 건너뜀"
fi

echo "=== Setup 완료! ==="
echo ""
echo "사용 가능한 명령어:"
echo "  npm run dev          → Vite 개발 서버 (http://localhost:5173)"
echo "  npm run check-all    → 전체 검증 (format + typecheck + lint + test)"
echo "  claude               → Claude Code CLI"
echo "  noVNC 접속           → http://localhost:6080/vnc.html"
