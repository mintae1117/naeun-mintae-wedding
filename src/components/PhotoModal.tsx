import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { IoClose } from "react-icons/io5";
import type { GalleryImage } from "../types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface PhotoModalProps {
  images: GalleryImage[];
  initialSlide: number;
  onClose: () => void;
  /** 모달에서 사진을 넘길 때 현재 인덱스를 알려준다 — 호출부가 뒤 배경(카드 등)을 같은 위치로 맞출 수 있게. */
  onIndexChange?: (index: number) => void;
}

// 사진 크게 보기 모달 — 갤러리와 인터뷰(고양이 카드)가 공유한다.
// 열려 있는 동안 배경 스크롤을 잠그고, 뒤로가기(popstate)로도 닫힌다.
export const PhotoModal: React.FC<PhotoModalProps> = ({
  images,
  initialSlide,
  onClose,
  onIndexChange,
}) => {
  // onClose가 렌더마다 새 함수여도 마운트 이펙트(pushState)가 재실행되지 않도록 ref로 우회한다.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    // 스크롤 막기 + 히스토리에 상태 추가 (뒤로가기 대응)
    document.body.style.overflow = "hidden";
    window.history.pushState({ modalOpen: true }, "");
    const handlePopState = () => onCloseRef.current();
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="modal-overlay">
      <button
        className="modal-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
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
          // loop 모드라 실제 사진 순번은 realIndex다.
          onSlideChange={(swiper) => onIndexChange?.(swiper.realIndex)}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="modal-image-container">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="modal-image"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
