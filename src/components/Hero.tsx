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

const FONT_SERIF_KO = `'Gowun Dodum', 'Gaegu', sans-serif`;
const FONT_SERIF_EN = `'Quicksand', 'Nunito', sans-serif`;

/* ── 손글씨 애니메이션 버전 A: 이미지 마스크 리빌 ──
   PNG는 획 정보가 없어 실제 획 단위 분해는 불가하므로,
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

/* ── 손글씨 애니메이션 버전 B: SVG 텍스트 획 드로잉 ──
   글자 외곽선(stroke)이 그려진 뒤 색이 채워지는 방식.
   글자별 animation-delay로 왼쪽부터 순서대로 써진다 */
const drawLetter = keyframes`
  0% {
    stroke-dashoffset: 360;
    fill-opacity: 0;
  }
  70% {
    stroke-dashoffset: 0;
    fill-opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    fill-opacity: 1;
  }
`;

const HandwritingSvg = styled.svg`
  width: 100%;
  max-width: 400px;
  margin: 4px auto 0;
  display: block;
  overflow: visible;

  text {
    font-family: 'Caveat', cursive;
    font-size: 52px;
    font-weight: 600;
  }

  tspan {
    fill: #d05a86;
    fill-opacity: 0;
    stroke: #d05a86;
    stroke-width: 1;
    stroke-dasharray: 360;
    stroke-dashoffset: 360;
    animation: ${drawLetter} 1s ease forwards;
  }

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }

  @media (prefers-reduced-motion: reduce) {
    tspan {
      animation: none;
      stroke-dashoffset: 0;
      fill-opacity: 1;
    }
  }
`;

const HANDWRITING_TEXT = "We are getting married ♡";

/* 글자별 시작 딜레이(초): 기본 0.5초 대기 후 한 글자씩 이어서 */
const letterDelay = (index: number) => `${0.5 + index * 0.09}s`;

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
  color: #2a2620;
`;

const DateKo = styled.p`
  font-family: ${FONT_SERIF_KO};
  font-size: 13px;
  letter-spacing: 2px;
  color: #6d4c41;
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
            fetchPriority="high"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />
        </div>

        {/* 버전 A: 기존 이미지 + 마스크 리빌 애니메이션 */}
        <div className="hero-title-image">
          <AnimatedTitleImg src="/wemarry02.png" alt="결혼합니다" />
        </div>

        {/* 버전 B: SVG 텍스트 획 드로잉 애니메이션 (비교용 테스트) */}
        <HandwritingSvg viewBox="0 0 440 80" aria-hidden="true">
          <text x="220" y="54" textAnchor="middle">
            {HANDWRITING_TEXT.split("").map((char, i) => (
              <tspan key={i} style={{ animationDelay: letterDelay(i) }}>
                {char === " " ? " " : char}
              </tspan>
            ))}
          </text>
        </HandwritingSvg>

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
