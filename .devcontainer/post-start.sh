#!/bin/bash
# 컨테이너 시작 시마다 실행 (postStartCommand)

echo "=== Post-start setup ==="

# 1. Git 설정
echo "[1/4] Git 설정..."
git config pull.rebase true
git config init.defaultBranch main
git remote set-head origin main 2>/dev/null || true
git fetch origin main 2>/dev/null || true

if git show-ref --verify --quiet refs/heads/master; then
  CURRENT_BRANCH=$(git branch --show-current)
  if [ "$CURRENT_BRANCH" = "master" ]; then
    git checkout -B main origin/main 2>/dev/null && git branch -D master 2>/dev/null || true
  else
    git branch -D master 2>/dev/null || true
  fi
fi

# 2. Node.js PATH 보정
echo "[2/4] Node.js PATH 보정..."
if command -v node &>/dev/null; then
  NODE_BIN_DIR=$(dirname "$(which node)")
  if [ "$NODE_BIN_DIR" != "/usr/local/bin" ] && [ "$NODE_BIN_DIR" != "/usr/bin" ]; then
    sudo ln -sf "$NODE_BIN_DIR/node" /usr/local/bin/node 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npm" /usr/local/bin/npm 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npx" /usr/local/bin/npx 2>/dev/null || true
  fi
fi

# 3. Frontend 의존성 확인
echo "[3/4] Frontend 의존성 확인..."
cd frontend && npm install && cd ..

# 4. Backend 의존성 확인
echo "[4/4] Backend 의존성 확인..."
cd backend && pip install -e ".[dev]" 2>/dev/null && cd ..

echo "=== Post-start 완료! ==="
