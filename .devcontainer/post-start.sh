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

# 2. npm 의존성 설치
echo "[2/3] npm install..."
npm install

# 3. VNC 서버 시작
echo "[3/3] VNC 서버 시작..."
nohup /usr/local/bin/start-vnc.sh > /tmp/vnc.log 2>&1 &

echo "=== Post-start 완료! ==="
