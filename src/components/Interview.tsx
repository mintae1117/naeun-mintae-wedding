import React, { useRef, useState } from "react";
import type { GalleryImage, WeddingData } from "../types";
import type { Swiper as SwiperClass } from "swiper";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { PhotoModal } from "./PhotoModal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

interface InterviewProps {
  data: WeddingData;
}

// 고양이 사진 카드 — Swiper 카드 효과로 드래그해 넘기고, 탭하면 갤러리와 같은 모달로 크게 본다.
const PhotoCards: React.FC<{ photos: GalleryImage[] }> = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  // 모달에서 넘긴 사진 위치를 카드에도 되돌려주기 위한 카드 스와이퍼 인스턴스.
  const cardsSwiperRef = useRef<SwiperClass | null>(null);

  if (photos.length === 0) return null;

  return (
    <div className="photo-cards-wrap">
      <Swiper
        effect="cards"
        grabCursor
        modules={[EffectCards]}
        className="photo-cards-swiper"
        onSwiper={(swiper) => {
          cardsSwiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        // Swiper의 onClick은 드래그와 구분된 순수 탭에서만 온다 — 탭한 카드를 모달로 연다.
        onClick={(swiper) =>
          setModalIndex(
            typeof swiper.clickedIndex === "number"
              ? swiper.clickedIndex
              : swiper.activeIndex
          )
        }
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.id}>
            <img
              src={photo.url}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="photo-cards-hint">
        카드를 넘겨보고, 눌러서 크게 보세요 ({activeIndex + 1}/{photos.length})
      </p>
      {modalIndex !== null && (
        <PhotoModal
          images={photos}
          initialSlide={modalIndex}
          onClose={() => setModalIndex(null)}
          // 모달에서 사진을 넘기면 뒤의 카드도 같은 위치로 즉시(무애니메이션) 따라간다 —
          // 닫았을 때 카드가 이전 순서에 머물러 있지 않도록.
          onIndexChange={(index) => cardsSwiperRef.current?.slideTo(index, 0)}
        />
      )}
    </div>
  );
};

export const Interview: React.FC<InterviewProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="interview-section">
      <h2 className="section-title">INTERVIEW</h2>
      <p className="section-subtitle">신랑 신부에게 물어보았습니다!</p>

      <button
        className="interview-toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "인터뷰 접기" : "인터뷰 읽어보기"}
      </button>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className="interview-list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ overflow: "hidden" }}
          >
            {data.interview.map((item, index) => (
              <motion.div
                key={index}
                className="interview-item"
                variants={itemVariants}
              >
                <h3 className="interview-question">Q. {item.question}</h3>

                <div className="interview-answers">
                  <div className="answer-box couple-answer">
                    <p className="answer-text">{item.answer}</p>
                  </div>
                </div>

                {item.photos && <PhotoCards photos={item.photos} />}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
