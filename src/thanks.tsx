import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThanksPage } from "./pages/ThanksPage";

// /thanks/ 진입점 — 청첩장(App)과 분리된 감사 인사 페이지
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThanksPage />
  </StrictMode>
);
