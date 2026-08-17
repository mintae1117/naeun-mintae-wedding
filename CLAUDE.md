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
| AI Chatbot | Groq API (GPT-OSS 120B) |

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

## 삼성 인터넷 다크모드 색반전 — 해결 불가 (재시도 금지)

삼성 인터넷은 다크모드에서 사이트 색상을 강제로 어둡게 변환하며, **사이트(개발자) 쪽에서 막을 방법이 없다** (2026-08-09~10 실기기 검증 완료, 상용 청첩장 서비스들도 동일하게 안내만 함). 크롬·사파리·카카오톡 인앱 등 다른 브라우저는 문제 없음.

아래 방법 전부 실기기에서 실패했으므로 다시 시도하지 말 것:
- `color-scheme: only light` 또는 `light dark` 선언 + `prefers-color-scheme: dark` 라이트 색상 재선언 → 무시됨
- 배경색과 동일한 1px PNG를 `background-image`로 깔기 → 이미지도 밝기 ~30% 감소 + 글자색 반전으로 오히려 악화
- CSS 색상값 변경(배경 흰색 지정 등) → 렌더링 단계에서 변환되므로 무효

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
