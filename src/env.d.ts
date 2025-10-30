/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_R2_BASE_URL: string;
  readonly VITE_R2_WEDDING_FOLDER: string;
  readonly VITE_GALLERY_IMAGE_01: string;
  readonly VITE_GALLERY_IMAGE_02: string;
  readonly VITE_GALLERY_IMAGE_03: string;
  readonly VITE_GALLERY_IMAGE_04: string;
  readonly VITE_GALLERY_IMAGE_05: string;
  readonly VITE_GALLERY_IMAGE_06: string;
  readonly VITE_GALLERY_IMAGE_07: string;
  readonly VITE_GALLERY_IMAGE_08: string;
  readonly VITE_MAIN_HERO_IMAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
