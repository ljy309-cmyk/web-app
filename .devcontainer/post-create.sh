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

# 2. Node.js PATH 보정
# devcontainer feature(nvm)로 설치된 node/npm을 VS Code가 찾을 수 있도록
# /usr/local/bin에 심볼릭 링크 생성
echo "[2/6] Node.js PATH 보정..."
if command -v node &>/dev/null; then
  NODE_BIN_DIR=$(dirname "$(which node)")
  if [ "$NODE_BIN_DIR" != "/usr/local/bin" ] && [ "$NODE_BIN_DIR" != "/usr/bin" ]; then
    echo "  nvm Node 경로: $NODE_BIN_DIR → /usr/local/bin 링크 생성"
    sudo ln -sf "$NODE_BIN_DIR/node" /usr/local/bin/node 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npm" /usr/local/bin/npm 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npx" /usr/local/bin/npx 2>/dev/null || true
  fi
fi

# 3. Claude Code CLI 전역 설치
echo "[3/6] Claude Code CLI 설치..."
npm install -g @anthropic-ai/claude-code

# 4. npm 의존성 설치
echo "[4/6] npm install..."
npm install

# 5. Husky git hooks 활성화
echo "[5/6] Husky hooks 설정..."
npx husky

# 6. Python 의존성 (requirements.txt가 있으면)
if [ -f requirements.txt ]; then
  echo "[6/6] Python 패키지 설치..."
  pip install -r requirements.txt
else
  echo "[6/6] requirements.txt 없음, 건너뜀"
fi

echo "=== Setup 완료! ==="
echo ""
echo "사용 가능한 명령어:"
echo "  npm run dev          → Vite 개발 서버 (http://localhost:5173)"
echo "  npm run check-all    → 전체 검증 (format + typecheck + lint + test)"
echo "  claude               → Claude Code CLI"
echo "  noVNC 접속           → http://localhost:6080/vnc.html"
