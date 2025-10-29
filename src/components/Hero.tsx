import React from 'react';
import type { WeddingData } from '../types';

interface HeroProps {
  data: WeddingData;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="hero-section">
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
          <div className="photo-box">
            <p className="placeholder-text">메인 사진</p>
          </div>
        </div>

        <div className="music-control">
          <button className="music-toggle">🎵 배경음악</button>
        </div>
      </div>
    </section>
  );
};
