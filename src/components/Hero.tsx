import React, { useState, useEffect } from "react";
import type { WeddingData } from "../types";
import { IoHeart } from "react-icons/io5";
import { getMainHeroImageUrl } from "../config/r2";
import Snowfall from "react-snowfall";
import styled, { keyframes } from "styled-components";

interface HeroProps {
  data: WeddingData;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: rotate(-3deg) scale(0.95);
  }
  to {
    opacity: 1;
    transform: rotate(-3deg) scale(1);
  }
`;

const PreloaderWrapper = styled.div`
  width: 360px;
  height: 480px;
  background-color: #f8f8f8;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transform: rotate(-3deg);
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 320px;
    height: 420px;
    box-shadow: 0 7px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    width: 280px;
    height: 380px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top: 3px solid #fdadbc;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const StyledMainPhoto = styled.img<{ $isLoaded: boolean }>`
  width: 360px;
  height: 480px;
  object-fit: cover;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  display: ${({ $isLoaded }) => ($isLoaded ? "block" : "none")};
  transform: rotate(-3deg);
  animation: ${fadeIn} 0.6s ease-out;

  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  pointer-events: auto;

  @media (max-width: 768px) {
    width: 320px;
    height: 420px;
    box-shadow: 0 7px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    width: 280px;
    height: 380px;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    // 이미지 프리로딩
    const url = getMainHeroImageUrl();
    setImageUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setIsImageLoaded(true);
    };
    img.onerror = () => {
      // 에러가 나도 일단 표시 시도
      setIsImageLoaded(true);
    };
  }, []);

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
          {isImageLoaded && (
            <img src="/tape01.png" alt="테이프" className="photo-tape" />
          )}

          {!isImageLoaded && (
            <PreloaderWrapper>
              <Spinner />
            </PreloaderWrapper>
          )}

          <StyledMainPhoto
            src={imageUrl}
            alt="웨딩 메인 사진"
            $isLoaded={isImageLoaded}
            onLoad={() => setIsImageLoaded(true)}
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
