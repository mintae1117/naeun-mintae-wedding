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

### 반응형 브레이크포인트
```css
/* Desktop */
@media (max-width: 1024px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Mobile */
@media (max-width: 480px) { }
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
