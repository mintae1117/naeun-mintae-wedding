# MT-NAEUN-WEDDING 개발 규칙 (Claude Code)

## 프로젝트 개요
나은 & 민태의 모바일 청첩장 웹사이트. 결혼 청첩장 비용 절감을 위해 직접 개발한 사이트.

**Live URL**: https://naeun-mintae-wedding.pages.dev/

---

## 기본 원칙
- 모든 대화와 코드 주석은 한국어로 작성
- TypeScript 타입 안전성 준수
- 모바일 우선 반응형 디자인
- 기존 스타일/패턴 유지

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Build Tool | **Vite 7** |
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Styling | CSS + Styled Components + Framer Motion |
| Animation | Framer Motion, React Snowfall |
| UI | Swiper (갤러리), React Icons, QRCode.react |
| Hosting | Cloudflare Pages |
| Backend | Cloudflare Workers Functions |
| Database | Cloudflare D1 (SQLite) |
| Storage | Cloudflare R2 |
| AI Chatbot | Groq API (Llama 3.3) |

---

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev          # Vite 개발 서버

# 빌드
npm run build        # TypeScript 컴파일 + Vite 빌드

# 린트
npm run lint         # ESLint 실행

# 프리뷰
npm run preview      # 프로덕션 빌드 미리보기
```

---

## 프로젝트 구조

```
/
├── src/                          # 프론트엔드 소스
│   ├── components/               # React 컴포넌트 (14개)
│   │   ├── Hero.tsx              # 메인 히어로 섹션
│   │   ├── Invitation.tsx        # 청첩장 안내
│   │   ├── Interview.tsx         # 신랑신부 인터뷰 Q&A
│   │   ├── Gallery.tsx           # 사진 갤러리 (Swiper)
│   │   ├── WeddingDate.tsx       # 캘린더 + 카운트다운
│   │   ├── Location.tsx          # 오시는 길 (카카오맵)
│   │   ├── Information.tsx       # 안내사항
│   │   ├── Guestbook.tsx         # 방명록 (CRUD)
│   │   ├── Account.tsx           # 계좌번호 안내
│   │   ├── FlowerInfo.tsx        # 화환 안내
│   │   ├── GroqChatbot.tsx       # AI 챗봇
│   │   ├── BgMusic.tsx           # 배경음악 플레이어
│   │   ├── ScrollReveal.tsx      # 스크롤 애니메이션 래퍼
│   │   └── QRCode.tsx            # QR 코드 (비활성화)
│   ├── config/                   # 설정 파일
│   │   └── r2Config.ts           # R2 스토리지 URL 설정
│   ├── data/                     # 목 데이터
│   │   └── mockData.ts           # 결혼식 정보 데이터
│   ├── types/                    # TypeScript 타입 정의
│   │   └── index.ts              # 인터페이스 정의
│   ├── utils/                    # 유틸리티 함수
│   ├── App.tsx                   # 메인 앱 컴포넌트
│   ├── App.css                   # 글로벌 스타일 (1,757줄)
│   └── main.tsx                  # 진입점
│
├── functions/                    # Cloudflare Workers Functions
│   └── api/
│       ├── guestbook.ts          # GET/POST 방명록 API
│       ├── guestbook/[id].ts     # DELETE 방명록 API
│       └── chat.ts               # AI 챗봇 API
│
├── public/                       # 정적 자산
├── dist/                         # 빌드 출력
├── vite.config.ts                # Vite 설정
├── tsconfig.json                 # TypeScript 메인 설정
├── tsconfig.app.json             # 앱 TS 설정
├── tsconfig.functions.json       # Functions TS 설정
├── wrangler.toml                 # Cloudflare 설정
├── eslint.config.js              # ESLint 설정
└── schema.sql                    # DB 스키마
```

---

## API 엔드포인트

### 방명록 API

```typescript
// GET /api/guestbook - 방명록 목록 조회
Response: { entries: GuestbookEntry[] }

// POST /api/guestbook - 방명록 작성
Body: { author: string, message: string, password: string }
Response: { id: string, author, message, date }

// DELETE /api/guestbook/[id] - 방명록 삭제 (비밀번호 확인)
Body: { password: string }
Response: { success: boolean }
```

### AI 챗봇 API

```typescript
// POST /api/chat - AI 챗봇 대화
Body: { messages: ChatMessage[] }
Response: { response: string }
```

---

## 핵심 타입 정의

```typescript
// src/types/index.ts
interface WeddingData {
  groom: Person;
  bride: Person;
  weddingDate: string;    // "2026.10.25"
  weddingTime: string;    // "오후 2시"
  venue: Venue;
  parents: Parents;
  gallery: GalleryImage[];
  interview: Interview[];
  guestbook: GuestbookEntry[];
  accounts: Accounts;
}

interface Person {
  name: string;           // 한글 이름
  englishName?: string;   // 영문 이름
  phone: string;
  father: string;
  mother: string;
  relation: string;       // "장남", "장녀" 등
}

interface GuestbookEntry {
  id: string;
  author: string;
  message: string;
  date: string;
}

interface Venue {
  name: string;
  address: string;
  phone: string;
  floor: string;
  hall: string;
  transportation: Transportation[];
  parking: string;
}
```

---

## 스타일링 가이드

### 컬러 팔레트
```css
/* Primary - 브라운 계열 */
--brown-primary: #8b7355;
--brown-dark: #6d5a45;
--brown-darker: #5d4037;

/* Accent - 핑크 계열 */
--pink-light: #fdadbc;
--pink-accent: #ff6b6b;
--pink-muted: #ff8e8e;

/* Background */
--bg-white: #ffffff;
--bg-light: #fafafa;
--bg-gray: #f5f5f5;
```

### 반응형 브레이크포인트
```css
/* Desktop */
@media (max-width: 1024px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Mobile */
@media (max-width: 480px) { }
```

### 스타일링 방식
1. **App.css**: 글로벌 스타일, 섹션별 스타일
2. **Styled Components**: 컴포넌트 스코프 스타일 (Hero.tsx 등)
3. **인라인 스타일**: 동적 스타일 (상태 기반)
4. **Framer Motion**: 애니메이션

---

## 컴포넌트 패턴

### ScrollReveal 래퍼 사용
```tsx
import ScrollReveal from './ScrollReveal';

// 사용 예시
<ScrollReveal direction="up" delay={0.2}>
  <YourComponent />
</ScrollReveal>

// direction: "up" | "down" | "left" | "right" | "fade"
```

### 갤러리 모달 패턴
```tsx
// Swiper + 모달 조합
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

<Swiper
  modules={[Navigation, Pagination]}
  navigation
  pagination={{ clickable: true }}
>
  {images.map((img, idx) => (
    <SwiperSlide key={idx}>
      <img src={img} onClick={() => setSelectedIndex(idx)} />
    </SwiperSlide>
  ))}
</Swiper>
```

### 방명록 페이지네이션
```tsx
// 5페이지 단위 스마트 페이지네이션
const getPageNumbers = () => {
  const pages = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  // ...
};
```

---

## Cloudflare 설정

### wrangler.toml
```toml
main = "functions/api/guestbook.ts"
compatibility_date = "2025-10-04"

[[d1_databases]]
binding = "DB"
database_name = "my_wedding"
database_id = "b980f0d8-8b10-431d-b2d2-45b8d9a5cc08"
```

### 환경변수 (Cloudflare Dashboard)
```
GROQ_API_KEY=<Groq API 키>
```

---

## R2 스토리지 설정

```typescript
// src/config/r2Config.ts
export const R2_BASE_URL = 'https://pub-aff195e758a643619b9135886dc7b279.r2.dev';
export const R2_FOLDER = 'my_wedding';

// 이미지 URL 생성
export const getImageUrl = (filename: string) =>
  `${R2_BASE_URL}/${R2_FOLDER}/${filename}`;
```

---

## 결혼식 정보 (mockData.ts)

| 항목 | 값 |
|------|------|
| 신랑 | 김민태 (Kim Mintae) |
| 신부 | 김나은 (Kim Naeun) |
| 일시 | 2026년 10월 25일 (일) 오후 2시 |
| 장소 | 아벤티움 웨딩 서울 (브라운스톤 서울 3층) |
| 주소 | 서울특별시 중구 충무로 464 |
| 신혼여행 | 뉴질랜드 |

---

## 체크리스트

### 새 컴포넌트 추가 시
- [ ] TypeScript 타입 정의
- [ ] ScrollReveal 래퍼 적용 (필요시)
- [ ] 반응형 스타일 (3단계 브레이크포인트)
- [ ] App.css에 스타일 추가 또는 Styled Components 사용

### API 수정 시
- [ ] functions/ 디렉토리에 파일 추가/수정
- [ ] CORS 헤더 설정 확인
- [ ] D1 바인딩 확인 (wrangler.toml)
- [ ] 로컬 테스트: `npx wrangler pages dev`

### 배포 전
- [ ] `npm run build` 성공 확인
- [ ] `npm run lint` 경고 없음
- [ ] Cloudflare Pages 자동 배포 (main 브랜치 푸시)

---

## Git 커밋 규칙

```
<type>: <subject>

# type
- feat: 새 기능
- fix: 버그 수정
- style: 스타일 변경
- refactor: 리팩토링
- docs: 문서
- chore: 기타

# 예시
feat: 방명록 페이지네이션 추가
fix: 갤러리 모달 스크롤 버그 수정
style: 모바일 반응형 개선
```
