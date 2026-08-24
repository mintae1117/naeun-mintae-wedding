import React, { useState, useEffect, useRef } from "react";
import type { WeddingData } from "../types";
import { PhotoModal } from "./PhotoModal";

interface GalleryProps {
  data: WeddingData;
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // 스크롤 잠금·뒤로가기 처리는 PhotoModal이 담당한다(인터뷰 고양이 카드와 공유).
  const openModal = (index: number) => {
    setInitialSlide(index);
    setIsModalOpen(true);
  };

  // 갤러리 섹션이 뷰포트 근처에 오면 이미지 로드 시작
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartLoading(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // 200px 전에 미리 로드 시작
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // 모든 이미지 미리 로드
  useEffect(() => {
    if (!startLoading || data.gallery.length === 0) return;

    // let loadedCount = 0;
    // const totalImages = data.gallery.length;

    const preloadImage = (url: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // 에러가 나도 계속 진행
        img.src = url;
      });
    };

    // 모든 이미지를 병렬로 로드
    Promise.all(data.gallery.map((image) => preloadImage(image.url))).then(
      () => {
        setImagesLoaded(true);
      }
    );
  }, [startLoading, data.gallery]);

  return (
    <section className="gallery-section" ref={sectionRef}>
      <h2 className="section-title">GALLERY</h2>
      <p className="section-subtitle">우리의 소중한 순간들</p>

      <div
        className="gallery-body"
        style={{
          opacity: imagesLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {/* 대표 사진: 그리드 위에 한 장만 크게 */}
        {data.gallery.length > 0 && (
          <div className="gallery-featured" onClick={() => openModal(0)}>
            <img
              src={data.gallery[0].url}
              alt={data.gallery[0].alt}
              className="gallery-featured-image"
              loading="lazy"
            />
          </div>
        )}

        <div className="gallery-grid">
          {data.gallery.slice(1).map((image, index) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openModal(index + 1)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="gallery-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 로딩 중 placeholder */}
      {!imagesLoaded && (
        <div
          className="gallery-grid"
          style={{ minHeight: "300px", position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div className="loading-spinner" />
            <span style={{ color: "#8b7355", fontSize: "14px" }}>
              사진을 불러오는 중...
            </span>
          </div>
        </div>
      )}

      {isModalOpen && (
        <PhotoModal
          images={data.gallery}
          initialSlide={initialSlide}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};
