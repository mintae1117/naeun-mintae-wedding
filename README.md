# 나은 & 민태의 청첩장 웹사이트

> 그거 돈 주고 할 바에 내가 직접 만드는 나만의 청첩장 ✨  
> 방문하기 👉 [링크](https://naeun-mintae-wedding.pages.dev/)

---

## 기술 스택

| 분야             | 사용 기술                      |
| ---------------- | ------------------------------ |
| **Frontend**     | React, TypeScript, Vite        |
| **Styling**      | CSS, Framer-Motion         |
| **배포 (CI/CD)** | Cloudflare Pages  |
| **저장소 (storage)** | Cloudflare R2  |
| **데이터베이스 (database)** | Cloudflare D1 SQL DB  |
| **코드 관리**    | Git + GitHub                   |
| **AI ChatBot**    | Groq + Cloudflare Env        |

---

## 프로젝트 구조

```
mt-naeun-wedding/
├── public/                     # 정적 파일
│   ├── flower.avif             # 꽃 이미지
│   ├── Howell-Magic.mp3        # 배경음악
│   ├── ihearSymphony.mp3       # 배경음악
│   ├── kakao-map.png           # 카카오맵 아이콘
│   ├── naver-map.png           # 네이버맵 아이콘
│   ├── t-map.png               # 티맵 아이콘
│   ├── mt-naeun-wedding-qr.png # QR 코드 이미지
│   ├── snowflake02.png         # 눈송이 이미지
│   ├── tape01.png              # 테이프 이미지
│   └── wemarry0*.png           # 웨딩 이미지
│
├── src/
│   ├── components/             # React 컴포넌트
│   │   ├── Account.tsx         # 계좌 정보
│   │   ├── BgMusic.tsx         # 배경음악 플레이어
│   │   ├── FlowerInfo.tsx      # 화환 안내
│   │   ├── Gallery.tsx         # 갤러리 (Swiper)
│   │   ├── GroqChatbot.tsx     # AI 챗봇
│   │   ├── GroqChatbot.css     # 챗봇 스타일
│   │   ├── Guestbook.tsx       # 방명록
│   │   ├── Hero.tsx            # 메인 히어로 섹션
│   │   ├── Information.tsx     # 신랑/신부 정보
│   │   ├── Interview.tsx       # 인터뷰 섹션
│   │   ├── Invitation.tsx      # 청첩 문구
│   │   ├── Location.tsx        # 오시는 길
│   │   ├── QRCode.tsx          # QR 코드 컴포넌트
│   │   ├── QRCode.css          # QR 코드 스타일
│   │   ├── ScrollReveal.tsx    # 스크롤 애니메이션
│   │   └── WeddingDate.tsx     # 결혼식 날짜/캘린더
│   │
│   ├── config/
│   │   └── r2.ts               # Cloudflare R2 설정
│   │
│   ├── data/
│   │   └── mockData.ts         # 결혼식 정보 데이터
│   │
│   ├── types/
│   │   ├── index.ts            # 타입 정의
│   │   └── swiper.d.ts         # Swiper 타입 선언
│   │
│   ├── utils/
│   │   └── transportationParser.ts  # 교통 정보 파싱
│   │
│   ├── App.tsx                 # 메인 앱 컴포넌트
│   ├── App.css                 # 전역 스타일
│   └── main.tsx                # 앱 엔트리포인트
│
├── functions/                  # Cloudflare Pages Functions (서버리스)
│   └── api/
│       ├── chat.ts             # AI 챗봇 API
│       ├── guestbook.ts        # 방명록 API
│       └── guestbook/
│           └── [id].ts         # 방명록 개별 항목 API
│
├── index.html                  # HTML 템플릿
├── vite.config.ts              # Vite 설정
├── tsconfig.json               # TypeScript 설정
├── wrangler.toml               # Cloudflare Wrangler 설정
├── schema.sql                  # D1 데이터베이스 스키마
└── package.json                # 프로젝트 의존성
```
