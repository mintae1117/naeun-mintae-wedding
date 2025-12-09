import React, { useState, useEffect } from "react";
import type { WeddingData } from "../types";
import { IoHeart } from "react-icons/io5";
import { getMainHeroImageUrl } from "../config/r2";
import Snowfall from "react-snowfall";
import styled, { keyframes } from "styled-components";

interface HeroProps {
  data: WeddingData;
}

// 예쁜 로더 애니메이션
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
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

const ImageLoader = styled.div`
  width: 360px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #f8f4f0 25%, #fff5f5 50%, #f8f4f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transform: rotate(-3deg);
  position: relative;
`;

const HeartLoader = styled.div`
  font-size: 48px;
  color: #fdadbc;
  animation: ${pulse} 1.2s ease-in-out infinite;
  margin-bottom: 16px;
`;

const LoadingText = styled.p`
  font-size: 14px;
  color: #8b7355;
  letter-spacing: 2px;
  font-weight: 300;
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
          <img src="/tape01.png" alt="테이프" className="photo-tape" />

          {!isImageLoaded && (
            <ImageLoader>
              <HeartLoader>
                <IoHeart />
              </HeartLoader>
              <LoadingText>사진을 불러오는 중...</LoadingText>
            </ImageLoader>
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
