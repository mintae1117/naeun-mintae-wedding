// Cloudflare R2 Configuration
// R2 Base URL과 폴더 경로를 설정합니다.

// 환경 변수가 있으면 사용하고, 없으면 기본값 사용 (배포 환경 대응)
export const R2_CONFIG = {
  baseUrl: import.meta.env.VITE_R2_BASE_URL || 'https://pub-aff195e758a643619b9135886dc7b279.r2.dev',
  folder: import.meta.env.VITE_R2_WEDDING_FOLDER || 'my_wedding',
};

// 이미지 파일명 설정
export const IMAGE_FILES = {
  gallery: [
    import.meta.env.VITE_GALLERY_IMAGE_01 || 'wedtmp01.jpeg',
    import.meta.env.VITE_GALLERY_IMAGE_02 || 'wedtmp02.jpeg',
    import.meta.env.VITE_GALLERY_IMAGE_03 || 'wedtmp03.jpeg',
    import.meta.env.VITE_GALLERY_IMAGE_04 || 'wedtmp04.jpeg',
    import.meta.env.VITE_GALLERY_IMAGE_05 || 'wedtmp05.jpeg',
    import.meta.env.VITE_GALLERY_IMAGE_06 || 'wedtmp06.jpeg',
    import.meta.env.VITE_GALLERY_IMAGE_07 || 'wedtmp07.jpeg',
    import.meta.env.VITE_GALLERY_IMAGE_08 || 'wedtmp08.jpeg',
  ],
  mainHero: import.meta.env.VITE_MAIN_HERO_IMAGE || 'wedtmp01.jpeg',
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
