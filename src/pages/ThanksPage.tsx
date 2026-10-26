import React from "react";
import { mockWeddingData } from "../data/mockData";
import { getImageUrl, IMAGE_FILES } from "../config/r2";
import "./ThanksPage.css";

/** 어느 집 혼주 이름으로 보낼지 — `/thanks/?side=groom` 또는 `?side=bride`, 없으면 양가 모두 */
type Side = "groom" | "bride" | "both";

const readSide = (): Side => {
  const v = new URLSearchParams(window.location.search).get("side");
  return v === "groom" || v === "bride" ? v : "both";
};

/** "2026.10.25 (일요일)" → "10월 25일" */
const toKoreanDate = (weddingDate: string): string => {
  const m = weddingDate.match(/(\d{4})\.(\d{2})\.(\d{2})/);
  return m ? `${Number(m[2])}월 ${Number(m[3])}일` : weddingDate;
};

export const ThanksPage: React.FC = () => {
  const { groom, bride, weddingDate } = mockWeddingData;
  const side = readSide();
  const date = toKoreanDate(weddingDate);

  // 서명 줄 — 한 집만 고르면 "혼주 ○○○ · ○○○ 드림", 양가면 신랑측·신부측 두 줄
  const signLines =
    side === "groom"
      ? [`혼주 ${groom.father} · ${groom.mother} 드림`]
      : side === "bride"
        ? [`혼주 ${bride.father} · ${bride.mother} 드림`]
        : [
            `신랑측 혼주 ${groom.father} · ${groom.mother}`,
            `신부측 혼주 ${bride.father} · ${bride.mother} 드림`,
          ];

  return (
    <main className="thanks-page">
      <article className="thanks-card">
        <h1 className="thanks-title">감사합니다.</h1>

        <figure className="thanks-photo-frame">
          <img
            src={getImageUrl(IMAGE_FILES.galleryFeatured)}
            alt={`${groom.name} · ${bride.name} 웨딩 사진`}
          />
        </figure>

        <p className="thanks-text">
          지난 {date},
          <br />
          바쁘신 와중에도 저희 자녀의 혼사에
          <br />
          귀한 걸음 해주시고 따뜻한 축하와 축복을
          <br />
          보내주신 모든 분들께 진심으로 감사드립니다.
        </p>

        <p className="thanks-text">
          보내주신 소중한 마음 오래도록 간직하겠으며,
          <br />
          늘 따뜻한 마음에 보답할 수 있도록 하겠습니다.
          <br />
          항상 건강하시고 행복하시기를 기원합니다.
        </p>

        <p className="thanks-sign">
          {signLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </article>
    </main>
  );
};
