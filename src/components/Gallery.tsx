import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import type { WeddingData } from "../types";
import { IoClose } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface GalleryProps {
  data: WeddingData;
}

export const Gallery: React.FC<GalleryProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const openModal = (index: number) => {
    setInitialSlide(index);
    setIsModalOpen(true);
    // 스크롤 막기
    document.body.style.overflow = "hidden";
    // 히스토리에 상태 추가 (뒤로가기 대응)
    window.history.pushState({ modalOpen: true }, "");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // 스크롤 복원
    document.body.style.overflow = "unset";
  };

  // 뒤로가기 버튼 처리
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isModalOpen) {
        event.preventDefault();
        closeModal();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isModalOpen]);

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
        className="gallery-grid"
        style={{
          opacity: imagesLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {data.gallery.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openModal(index)}
          >
            <img src={image.url} alt={image.alt} className="gallery-image" />
          </div>
        ))}
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
        <div className="modal-overlay">
          <button
            className="modal-close"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            <IoClose />
          </button>
          <div className="gallery-swiper-wrapper">
            <Swiper
              initialSlide={initialSlide}
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="gallery-modal-swiper"
            >
              {data.gallery.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className="modal-image-container">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="modal-image"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
};
