import type { WeddingData } from "../types";
import { getGalleryImages } from "../config/r2";

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
    address: "서울특별시 중구 청파로 464 브라운스톤서울 3층",
    phone: "02-313-2480",
    floor: "3층",
    hall: "그랜드홀",
    mapUrl: "https://map.naver.com/v5/search/브라운스톤서울",
    transportation: [
      {
        type: "subway",
        description: "2, 5호선 충정로역 4번 출구 도보 3분",
      },
      {
        type: "subway",
        description: "1, 4호선 서울역 15번출구(공항철도역) 도보 10분",
      },
      {
        type: "bus",
        description:
          "한국경제신문사 하차 - [간선] 370, 603 [지선] 7011, 7013A, 7013B, 7017",
      },
      {
        type: "bus",
        description:
          "경찰청·동북아역사재단 하차 - [간선] 103, 150, 701, 704, 708, 709, 742, 750A",
      },
      {
        type: "bus",
        description: "서울역서부 하차 - [간선] 173, 261, 262, 463, 503, 604",
      },
    ],
    parking: "건물 내 지하 주차장 이용 가능 (2시간 무료)",
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
  gallery: getGalleryImages(),
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
      groomAnswer: "서울 사당 근처에 신혼집을 마련했습니다.",
      brideAnswer: "아늑하고 따뜻한 공간으로 함께 꾸며갈 예정이에요.",
    },
  ],
  guestbook: [
    {
      id: "1",
      author: "김친구",
      message: "결혼 진심으로 축하해! 행복하게 잘 살아~(예시)",
      date: "2025-10-20",
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
