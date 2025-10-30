import React, { useState, useRef, useEffect } from "react";
import type { WeddingData } from "../types";
import { IoMusicalNotes, IoClose, IoHeart } from "react-icons/io5";
import { getMainHeroImageUrl } from "../config/r2";
import Snowfall from "react-snowfall";

interface HeroProps {
  data: WeddingData;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 컴포넌트 마운트 시 자동 재생 시도
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 볼륨 50%로 설정
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // 자동 재생이 차단된 경우 (브라우저 정책)
          console.log("Autoplay was prevented:", error);
          setIsPlaying(false);
        });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Play failed:", error);
          });
      }
    }
  };

  return (
    <section className="hero-section">
      {/* 배경 음악 */}
      <audio ref={audioRef} loop>
        <source src="/ihearSymphony.mp3" type="audio/mpeg" />
      </audio>

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
          <IoHeart className="heart-icon" />
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
