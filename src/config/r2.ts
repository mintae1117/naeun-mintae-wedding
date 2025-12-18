// Cloudflare R2 Configuration
// R2 Base URL과 폴더 경로를 설정합니다.

export const R2_CONFIG = {
  baseUrl: "https://pub-aff195e758a643619b9135886dc7b279.r2.dev",
  folder: "my_wedding",
};

// 이미지 파일명 설정
export const IMAGE_FILES = {
  gallery: [
    "wedtmp01.jpeg",
    "wedtmp02.jpeg",
    "wedtmp03.jpeg",
    "wedtmp04.jpeg",
    "wedtmp05.jpeg",
    "wedtmp06.jpeg",
    "wedtmp07.jpeg",
    "wedtmp08.jpeg",
  ],
  mainHero: "wedtmp01.jpeg",
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
