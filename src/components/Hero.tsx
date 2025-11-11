import React from "react";
import type { WeddingData } from "../types";
import { IoHeart } from "react-icons/io5";
import { getMainHeroImageUrl } from "../config/r2";
import Snowfall from "react-snowfall";

interface HeroProps {
  data: WeddingData;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const snowflake2 = document.createElement("img");
  snowflake2.src = "/snowflake02.png";

  const images = [snowflake2];

  return (
    <section className="hero-section">
      <Snowfall
        snowflakeCount={20}
        color="#fdadbc"
        style={{ zIndex: "101" }}
        radius={[10.0, 15.0]}
        images={images}
      />

      <div className="hero-content">
        <div className="main-photo-placeholder">
          <img src="/tape01.png" alt="테이프" className="photo-tape" />
          <img
            src={getMainHeroImageUrl()}
            alt="웨딩 메인 사진"
            className="main-photo"
          />
        </div>

        <div className="hero-title-image">
          <img
            src="/wemarry02.png"
            alt="결혼합니다"
            className="hero-title-img"
          />
        </div>

        <div className="couple-names">
          <span className="groom-name">{data.groom.name}</span>
          <IoHeart className="heart-icon" />
          <span className="bride-name">{data.bride.name}</span>
        </div>

        <div className="wedding-date">
          <p className="date">{data.weddingDate}</p>
          <p className="time">{data.weddingTime}</p>
        </div>
      </div>
    </section>
  );
};
