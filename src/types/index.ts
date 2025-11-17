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
  groomAnswer: string;
  brideAnswer: string;
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
