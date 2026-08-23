import React from "react";
import { getImageUrl, IMAGE_FILES } from "../config/r2";

export const LastPage: React.FC = () => {
  return (
    <section className="last-page-section">
      <div className="last-page-header">
        <div className="last-page-phrase-block">
          <span className="last-page-accent" />
          <p className="last-page-phrase">
            Be our witness
            <br />
            as we start forever.
          </p>
        </div>
        <p className="last-page-date">25 OCT 2026</p>
      </div>

      <div className="fade-photo-wrap last-page-photo-wrap">
        <img
          className="fade-photo"
          src={getImageUrl(IMAGE_FILES.lastPage)}
          alt="신랑 신부 웨딩 사진"
          loading="lazy"
        />
      </div>
    </section>
  );
};
