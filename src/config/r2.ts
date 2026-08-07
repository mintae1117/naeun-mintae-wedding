// Cloudflare R2 Configuration
// R2 Base URL과 폴더 경로를 설정합니다.

export const R2_CONFIG = {
  baseUrl: "https://pub-aff195e758a643619b9135886dc7b279.r2.dev",
  // 르레브 수정본 17장은 버킷의 my_wedding/wedding001 폴더 안에 있다.
  folder: "my_wedding/wedding001",
};

// 이미지 파일명 설정 (wedding001은 히어로 전용, 갤러리는 002~017)
export const IMAGE_FILES = {
  gallery: [
    "wedding002.jpg",
    "wedding003.jpg",
    "wedding004.jpg",
    "wedding005.jpg",
    "wedding006.jpg",
    "wedding007.jpg",
    "wedding008.jpg",
    "wedding009.jpg",
    "wedding010.jpg",
    "wedding011.jpg",
    "wedding012.jpg",
    "wedding013.jpg",
    "wedding014.jpg",
    "wedding015.jpg",
    "wedding016.jpg",
    "wedding017.jpg",
  ],
  mainHero: "wedding001.jpg",
};

// Helper function to build R2 image URL
export const getImageUrl = (filename: string): string => {
  return `${R2_CONFIG.baseUrl}/${R2_CONFIG.folder}/${filename}`;
};

// 갤러리 이미지 URL들을 미리 생성
export const getGalleryImages = () => {
  return IMAGE_FILES.gallery.map((filename, index) => ({
    id: String(index + 1),
    url: getImageUrl(filename),
    alt: `웨딩 사진 ${index + 1}`,
  }));
};

// 메인 히어로 이미지 URL
export const getMainHeroImageUrl = (): string => {
  return getImageUrl(IMAGE_FILES.mainHero);
};
