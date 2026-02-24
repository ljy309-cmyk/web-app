# Web App

Full Stack 실시간 실험 대시보드 웹 애플리케이션입니다.

## 기술 스택

### Frontend

- **Next.js 15** (App Router + Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS** (스타일링)
- **Zustand** (상태 관리)
- **Recharts** (실시간 그래프)
- **Socket.IO** (실시간 통신)

### Backend

- **FastAPI** (Python 3.12)
- **SQLAlchemy** (ORM)
- **Alembic** (DB 마이그레이션)
- **Celery** + **Redis** (비동기 작업 큐)
- **PostgreSQL** (데이터베이스)

### 인프라

- **Docker Compose** (컨테이너 오케스트레이션)
- **GitHub Codespaces** (클라우드 개발 환경)
- **GitHub Actions** (CI/CD)

## 시작하기

### Docker Compose (권장)

```bash
# 전체 스택 실행 (frontend + backend + postgres + redis + celery)
docker compose up -d

# 로그 확인
docker compose logs -f

# 종료
docker compose down
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API 문서: http://localhost:8000/api/docs

### 로컬 개발

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```

## 프로젝트 구조

```
web-app/
├── frontend/               # Next.js 15 프론트엔드
│   ├── src/
│   │   ├── app/            # App Router (페이지, 레이아웃)
│   │   ├── components/     # React 컴포넌트
│   │   ├── stores/         # Zustand 상태 관리
│   │   └── lib/            # 유틸리티 (Socket.IO, 물리 계산)
│   └── vitest.config.ts
│
├── backend/                # FastAPI 백엔드
│   ├── app/
│   │   ├── api/            # API 라우터
│   │   ├── models/         # SQLAlchemy 모델
│   │   ├── services/       # 비즈니스 로직
│   │   ├── core/           # 설정, 보안
│   │   └── db/             # DB 세션, Alembic 마이그레이션
│   └── tests/
│
├── docker-compose.yml      # 프로덕션 Docker 구성
├── docker-compose.dev.yml  # Codespace/개발 Docker 구성
├── .devcontainer/          # GitHub Codespaces 설정
└── .github/workflows/      # CI/CD
```

## Codespace

GitHub Codespaces에서 즉시 개발을 시작할 수 있습니다.
"Code" 버튼 → "Codespaces" 탭 → "Create codespace on main"을 클릭하세요.
