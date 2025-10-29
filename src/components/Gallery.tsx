import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import type { WeddingData } from "../types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
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
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            <div className="image-placeholder">
              <p className="placeholder-text">사진 {image.id}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <div className="gallery-swiper-container">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                initialSlide={initialSlide}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="gallery-swiper"
              >
                {data.gallery.map((image) => (
                  <SwiperSlide key={image.id}>
                    <div className="modal-image-placeholder">
                      <p className="placeholder-text">사진 {image.id}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
