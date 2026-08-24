export interface WeddingData {
  bride: Person;
  groom: Person;
  weddingDate: string;
  weddingTime: string;
  venue: Venue;
  parents: Parents;
  gallery: GalleryImage[];
  interview: Interview[];
  guestbook: GuestbookEntry[];
  accounts: Accounts;
}

export interface Person {
  name: string;
  englishName?: string;
  phone: string;
  father: string;
  mother: string;
  relation: string; // '장남', '차녀' 등
  profile: PersonProfile;
}

// INVITATION 프로필 카드(두 사람을 소개합니다)에 쓰는 소개 정보
export interface PersonProfile {
  photo: string; // 프로필 사진 URL (임시: 갤러리 이미지)
  birth: string; // 예: "1996년 4월 11일"
  tags: string[]; // 예: ["#ESFJ"]
}

export interface Venue {
  name: string;
  address: string;
  phone: string;
  floor: string;
  hall: string;
  mapUrl?: string;
  transportation: Transportation[];
  parking: string;
}

export interface Transportation {
  type: "subway" | "bus" | "shuttle";
  description: string;
  text: string;
}

export interface Parents {
  groom: {
    father: string;
    mother: string;
  };
  bride: {
    father: string;
    mother: string;
  };
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface Interview {
  question: string;
  /** 신랑·신부 공동 답변('우리' 화법이라 신랑/신부를 나누지 않는다). */
  answer: string;
  /** 답변 아래에 겹쳐 보여줄 사진 스택 (선택 — '작은 가족' 문항의 고양이 사진). */
  photos?: GalleryImage[];
}

export interface GuestbookEntry {
  id: string;
  author: string;
  message: string;
  date: string;
}

export interface Account {
  holder: string;
  bank: string;
  accountNumber: string;
}

export interface Accounts {
  groom: Account[];
  bride: Account[];
}
