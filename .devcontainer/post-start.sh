#!/bin/bash
# 컨테이너 시작 시마다 실행 (postStartCommand)

echo "=== Post-start setup ==="

# 1. Git 설정 - divergent branches 오류 방지
echo "[1/3] Git 설정..."
git config pull.rebase true
git config init.defaultBranch main
git remote set-head origin main 2>/dev/null || true

# 최신 origin/main 가져오기
git fetch origin main 2>/dev/null || true

# master → main 브랜치 정리
if git show-ref --verify --quiet refs/heads/master; then
  CURRENT_BRANCH=$(git branch --show-current)
  if [ "$CURRENT_BRANCH" = "master" ]; then
    git checkout -B main origin/main 2>/dev/null && git branch -D master 2>/dev/null || true
  else
    git branch -D master 2>/dev/null || true
  fi
fi

# main 브랜치를 origin/main과 동기화
# main은 추적 브랜치이므로 항상 origin/main과 일치해야 함
if git show-ref --verify --quiet refs/remotes/origin/main; then
  CURRENT_BRANCH=$(git branch --show-current)

  if ! git show-ref --verify --quiet refs/heads/main; then
    # main이 없으면 생성
    echo "  main 브랜치 생성 (origin/main 기준)..."
    git branch main origin/main 2>/dev/null || true
  else
    LOCAL_MAIN=$(git rev-parse refs/heads/main 2>/dev/null)
    REMOTE_MAIN=$(git rev-parse refs/remotes/origin/main 2>/dev/null)

    if [ "$LOCAL_MAIN" != "$REMOTE_MAIN" ]; then
      echo "  main 브랜치를 origin/main으로 동기화..."
      if [ "$CURRENT_BRANCH" = "main" ]; then
        # main에 체크아웃 중이면 reset
        git reset --hard origin/main 2>/dev/null || true
      else
        # 다른 브랜치에 있으면 main을 직접 갱신
        git branch -f main origin/main 2>/dev/null || true
      fi
    fi
  fi

  # upstream 설정
  git branch --set-upstream-to=origin/main main 2>/dev/null || true
fi

# 2. Node.js PATH 보정 (nvm → /usr/local/bin 심볼릭 링크)
echo "[2/4] Node.js PATH 보정..."
if command -v node &>/dev/null; then
  NODE_BIN_DIR=$(dirname "$(which node)")
  if [ "$NODE_BIN_DIR" != "/usr/local/bin" ] && [ "$NODE_BIN_DIR" != "/usr/bin" ]; then
    sudo ln -sf "$NODE_BIN_DIR/node" /usr/local/bin/node 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npm" /usr/local/bin/npm 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npx" /usr/local/bin/npx 2>/dev/null || true
  fi
fi

# 3. npm 의존성 설치
echo "[3/4] npm install..."
npm install

# 4. VNC 서버 시작
echo "[4/4] VNC 서버 시작..."
nohup /usr/local/bin/start-vnc.sh > /tmp/vnc.log 2>&1 &

echo "=== Post-start 완료! ==="
