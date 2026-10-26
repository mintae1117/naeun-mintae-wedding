import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    rollupOptions: {
      // 진입점 두 개: 청첩장(/)과 감사 인사 페이지(/thanks/). Cloudflare Pages 는 dist/thanks/index.html 을 /thanks/ 로 그대로 서빙한다.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        thanks: fileURLToPath(new URL('./thanks/index.html', import.meta.url)),
      },
    },
  },
})
