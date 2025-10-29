import type { WeddingData } from "../types";

export const mockWeddingData: WeddingData = {
  groom: {
    name: "김민태",
    englishName: "Kim Mintae",
    phone: "010-1234-5678",
    father: "김아버지",
    mother: "김어머니",
    relation: "장남",
  },
  bride: {
    name: "김나은",
    englishName: "Kim Naeun",
    phone: "010-9876-5432",
    father: "이아버지",
    mother: "이어머니",
    relation: "차녀",
  },
  weddingDate: "2026.10.25 (일요일)",
  weddingTime: "오후 2시",
  venue: {
    name: "아벤티움 웨딩 서울",
    address: "서울특별시 강남구 논현로 742 (논현동)",
    phone: "02-512-0000",
    floor: "5층",
    hall: "그랜드홀",
    mapUrl: "https://map.naver.com/v5/search/아벤티움%20웨딩%20서울",
    transportation: [
      {
        type: "subway",
        description: "9호선 언주역 4번 출구 도보 3분 거리",
      },
      {
        type: "bus",
        description: "147, 463, 4211번 버스 이용 (언주역 하차)",
      },
      {
        type: "shuttle",
        description: "언주역 4번 출구 앞 셔틀버스 15분 간격 운행",
      },
    ],
    parking: "건물 내 지하 주차장 이용 가능 (3시간 무료)",
  },
  parents: {
    groom: {
      father: "김아버지",
      mother: "김어머니",
    },
    bride: {
      father: "이아버지",
      mother: "이어머니",
    },
  },
  gallery: [
    { id: "1", url: "/images/gallery-1.jpg", alt: "웨딩 사진 1" },
    { id: "2", url: "/images/gallery-2.jpg", alt: "웨딩 사진 2" },
    { id: "3", url: "/images/gallery-3.jpg", alt: "웨딩 사진 3" },
    { id: "4", url: "/images/gallery-4.jpg", alt: "웨딩 사진 4" },
    { id: "5", url: "/images/gallery-5.jpg", alt: "웨딩 사진 5" },
    { id: "6", url: "/images/gallery-6.jpg", alt: "웨딩 사진 6" },
    { id: "7", url: "/images/gallery-7.jpg", alt: "웨딩 사진 7" },
    { id: "8", url: "/images/gallery-8.jpg", alt: "웨딩 사진 8" },
  ],
  interview: [
    {
      question: "결혼을 결심한 이유는?",
      groomAnswer:
        "서로를 있는 그대로 존중하며 함께 웃을 수 있는 사람이기 때문입니다.",
      brideAnswer:
        "함께 있을 때 가장 행복하고 편안해서 평생 함께하고 싶었습니다.",
    },
    {
      question: "신혼여행은 어디로 가시나요?",
      groomAnswer: "자연이 아름다운 뉴질랜드로 떠날 예정입니다!",
      brideAnswer: "뉴질랜드의 멋진 자연 속에서 여유롭게 여행할 계획이에요.",
    },
    {
      question: "새로운 가정의 첫 터전은?",
      groomAnswer: "서울 강남구 근처에 신혼집을 마련했습니다.",
      brideAnswer: "아늑하고 따뜻한 공간으로 함께 꾸며갈 예정이에요.",
    },
  ],
  guestbook: [
    {
      id: "1",
      author: "김친구",
      message: "결혼 진심으로 축하해! 행복하게 잘 살아~ 💕",
      date: "2025-10-20",
    },
    {
      id: "2",
      author: "박동료",
      message:
        "두 분의 앞날에 사랑과 웃음이 가득하길 바랍니다. 진심으로 축하드려요!",
      date: "2025-10-21",
    },
  ],
  accounts: {
    groom: [
      {
        holder: "김민태",
        bank: "국민은행",
        accountNumber: "123-456-789012",
      },
      {
        holder: "김아버지",
        bank: "신한은행",
        accountNumber: "110-123-456789",
      },
    ],
    bride: [
      {
        holder: "김나은",
        bank: "우리은행",
        accountNumber: "1002-123-456789",
      },
      {
        holder: "이아버지",
        bank: "KB국민은행",
        accountNumber: "123456-01-123456",
      },
    ],
  },
};
