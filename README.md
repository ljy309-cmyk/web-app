# Web App

React + TypeScript + PWA 기반의 실시간 실험 대시보드 웹 애플리케이션입니다.

## 기술 스택

- **React 19** + **TypeScript**
- **Vite** (빌드 도구)
- **Recharts** (실시간 그래프)
- **PWA** (안드로이드 설치 지원)
- **CSS Modules** (스타일링)

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 프로젝트 구조

```
web-app/
├── public/              # 정적 파일
├── src/
│   ├── components/      # React 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   ├── utils/           # 유틸리티 함수 (물리 계산 등)
│   ├── styles/          # 글로벌 스타일
│   ├── assets/          # 이미지, 아이콘 등
│   ├── App.tsx          # 루트 컴포넌트
│   └── main.tsx         # 엔트리 포인트
├── index.html
├── vite.config.ts       # Vite + PWA 설정
├── tsconfig.json
└── package.json
```

## PWA (Progressive Web App)

이 앱은 PWA로 구성되어 있어 안드로이드 기기에서 홈 화면에 추가하여 네이티브 앱처럼 사용할 수 있습니다.

- Chrome에서 "홈 화면에 추가" 선택
- 오프라인 캐싱 지원
- 전체 화면(standalone) 모드 지원
