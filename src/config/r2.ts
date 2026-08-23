// Cloudflare R2 Configuration
// R2 Base URL과 폴더 경로를 설정합니다.

export const R2_CONFIG = {
  baseUrl: "https://pub-aff195e758a643619b9135886dc7b279.r2.dev",
  // 최종본 사진은 버킷의 my_wedding 폴더 아래 용도별 폴더에 나뉘어 있다.
  // gal_grid_final: 갤러리 20장 / hero_final: 히어로 1장 / info_final: 신랑·신부 프로필 2장
  folder: "my_wedding",
};

// 이미지 파일 경로 설정 (folder 기준 상대 경로)
// 갤러리 20장 중 3번은 대표 사진, 5번은 중간 삽입 컷, 18번은 마지막 페이지로 빠지고 17번은 쓰지 않는다.
export const IMAGE_FILES = {
  galleryFeatured: "gal_grid_final/3.jpg",
  gallery: [1, 2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20].map(
    (n) => `gal_grid_final/${n}.jpg`
  ),
  interlude: "gal_grid_final/5.jpg",
  lastPage: "gal_grid_final/18.jpg",
  mainHero: "hero_final/hero.jpg",
  profile: {
    groom: "info_final/mintae.jpg",
    bride: "info_final/naeun.jpg",
  },
};

// Helper function to build R2 image URL
export const getImageUrl = (filename: string): string => {
  return `${R2_CONFIG.baseUrl}/${R2_CONFIG.folder}/${filename}`;
};

// 갤러리 이미지 URL들을 미리 생성 (맨 앞이 대표 사진)
export const getGalleryImages = () => {
  return [IMAGE_FILES.galleryFeatured, ...IMAGE_FILES.gallery].map(
    (filename, index) => ({
      id: String(index + 1),
      url: getImageUrl(filename),
      alt: `웨딩 사진 ${index + 1}`,
    })
  );
};

// 메인 히어로 이미지 URL
export const getMainHeroImageUrl = (): string => {
  return getImageUrl(IMAGE_FILES.mainHero);
};
