import React from "react";
import { getImageUrl, IMAGE_FILES } from "../config/r2";

// 오시는 길과 방명록 사이에 들어가는 사진 한 장짜리 삽입 섹션
export const Interlude: React.FC = () => {
  return (
    <section className="interlude-section">
      <div className="fade-photo-wrap">
        <img
          className="fade-photo"
          src={getImageUrl(IMAGE_FILES.interlude)}
          alt="웨딩 사진"
          loading="lazy"
        />
      </div>
    </section>
  );
};
