import React, { useState } from "react";
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
  background-color: #f8f3e5;
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
  border: 3px solid #f0e9d3;
  border-top: 3px solid #064e3b;
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

const FONT_SERIF_KO = `'Gowun Batang', 'Gowun Dodum', 'Gaegu', serif`;
const FONT_SERIF_EN = `'Gowun Batang', 'Quicksand', 'Nunito', serif`;

/* ── 손글씨 애니메이션: 이미지 마스크 리빌 ──
   부드러운 그라데이션 마스크가 왼쪽→오른쪽으로 지나가며
   펜으로 써 내려가는 듯한 효과를 낸다 */
const maskReveal = keyframes`
  from {
    -webkit-mask-position: 100% 0;
    mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0% 0;
    mask-position: 0% 0;
  }
`;

const AnimatedTitleImg = styled.img`
  max-width: 400px;
  width: 100%;
  height: auto;
  object-fit: fill;
  transform: scaleX(1.2);

  /* 핑크 손글씨 PNG를 에메랄드 잉크(#064e3b) 톤으로 재염색 */
  filter: brightness(0) saturate(100%) invert(21%) sepia(93%)
    saturate(800%) hue-rotate(126deg) brightness(0.92) contrast(0.9);

  -webkit-mask-image: linear-gradient(to right, #000 45%, transparent 55%);
  mask-image: linear-gradient(to right, #000 45%, transparent 55%);
  -webkit-mask-size: 220% 100%;
  mask-size: 220% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: 100% 0;
  mask-position: 100% 0;
  animation: ${maskReveal} 2.4s ease-in-out 0.5s forwards;

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    -webkit-mask-image: none;
    mask-image: none;
  }
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-bottom: 5px;
`;

const DateEn = styled.span`
  font-family: ${FONT_SERIF_EN};
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 3px;
  color: #064e3b;
`;

const DateKo = styled.p`
  font-family: ${FONT_SERIF_KO};
  font-size: 13px;
  letter-spacing: 2px;
  color: #2e6b58;
  margin-bottom: 20px;
`;

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imageUrl = getMainHeroImageUrl();

  const snowflake2 = document.createElement("img");
  snowflake2.src = "/snowflake02.png";

  const images = [snowflake2];

  const dateOnly = data.weddingDate.split(" ")[0];
  const [year, month, day] = dateOnly.split(".");
  const dateEn = `${year} . ${month} . ${day}`;
  const dateKo = `${year}년 ${Number(month)}월 ${Number(day)}일`;

  return (
    <section className="hero-section">
      {/* 눈꽃 PNG(핑크)를 샴페인 골드 톤으로 보정하기 위해 캔버스에 sepia 필터 적용 */}
      <Snowfall
        snowflakeCount={20}
        color="#f8e7c9"
        style={{
          zIndex: "101",
          filter: "sepia(0.9) saturate(0.7) brightness(1.05)",
        }}
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
            fetchPriority="high"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />
        </div>

        <div className="hero-title-image">
          <AnimatedTitleImg src="/wemarry02.png" alt="결혼합니다" />
        </div>

        <div className="couple-names">
          <span className="groom-name">{data.groom.name}</span>
          <IoHeart className="heart-icon" />
          <span className="bride-name">{data.bride.name}</span>
        </div>

        <DateRow>
          <DateEn>{dateEn}</DateEn>
        </DateRow>

        <DateKo>
          {dateKo} · {data.weddingTime}
        </DateKo>
      </div>
    </section>
  );
};
