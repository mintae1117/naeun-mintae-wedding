import React, { useState } from "react";
import type { WeddingData } from "../types";
import { IoMusicalNotes, IoClose } from "react-icons/io5";
import { getMainHeroImageUrl } from "../config/r2";
import Snowfall from "react-snowfall";

interface HeroProps {
  data: WeddingData;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // TODO: 나중에 음악 재생/정지 로직 추가
    // if (!isPlaying) {
    //   audioRef.current?.play();
    // } else {
    //   audioRef.current?.pause();
    // }
  };

  return (
    <section className="hero-section">
      {/* 고정 음악 버튼 */}
      <button
        className={`music-control-fixed ${isPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? "음악 정지" : "음악 재생"}
      >
        <IoMusicalNotes className="music-icon" />
        {!isPlaying && <IoClose className="music-off-icon" />}
      </button>

      <Snowfall snowflakeCount={20} color="white" style={{zIndex: '101'}} />

      <div className="hero-content">
        <h1 className="hero-title">결혼합니다</h1>

        <div className="couple-names">
          <span className="groom-name">{data.groom.name}</span>
          <span className="heart"> ♥ </span>
          <span className="bride-name">{data.bride.name}</span>
        </div>

        <div className="wedding-date">
          <p className="date">{data.weddingDate}</p>
          <p className="time">{data.weddingTime}</p>
        </div>

        <div className="main-photo-placeholder">
          <div className="photo-tape"></div>
          <img
            src={getMainHeroImageUrl()}
            alt="웨딩 메인 사진"
            className="main-photo"
          />
        </div>
      </div>
    </section>
  );
};
