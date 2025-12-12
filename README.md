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
├── public/                 # 정적 파일 (이미지, 음악 등)
├── src/
│   ├── components/         # React 컴포넌트
│   ├── config/             # 설정 (R2 등)
│   ├── data/               # 결혼식 정보 데이터
│   ├── types/              # TypeScript 타입 정의
│   ├── utils/              # 유틸리티 함수
│   ├── App.tsx             # 메인 앱
│   └── main.tsx            # 엔트리포인트
├── functions/api/          # Cloudflare 서버리스 API
└── wrangler.toml           # Cloudflare 설정
```
