import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import type { WeddingData } from "../types";
import { IoClose } from "react-icons/io5"; // 추가

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

  return (
    <section className="gallery-section">
      <h2 className="section-title">GALLERY</h2>
      <p className="section-subtitle">우리의 소중한 순간들</p>

      <div className="gallery-grid">
        {data.gallery.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openModal(index)}
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
