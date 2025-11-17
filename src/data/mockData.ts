import type { WeddingData } from "../types";
import { getGalleryImages } from "../config/r2";

export const mockWeddingData: WeddingData = {
  groom: {
    name: "김민태",
    englishName: "Kim Mintae",
    phone: "010-1234-5678",
    father: "김철범",
    mother: "이미영",
    relation: "장남",
  },
  bride: {
    name: "김나은",
    englishName: "Kim Naeun",
    phone: "010-1234-5678",
    father: "김완기",
    mother: "이미희",
    relation: "차녀",
  },
  weddingDate: "2026.10.25 (일요일)",
  weddingTime: "오후 2시",
  venue: {
    name: "아벤티움 웨딩 서울",
    address: "서울특별시 중구 청파로 464 브라운스톤서울 3층",
    phone: "02-313-2480",
    floor: "3층",
    hall: "아벤티움 단독홀",
    mapUrl: "https://map.naver.com/v5/search/브라운스톤서울",
    transportation: [
      {
        type: "subway",
        description: "2호선, 5호선 충정로역 4번 출구 도보 3분",
        text: "충정로역 4번 출구 도보 3분",
      },
      {
        type: "subway",
        description: "1호선, 4호선 서울역 15번출구(공항철도역) 도보 10분",
        text: "서울역 15번출구(공항철도역) 도보 10분",
      },
      {
        type: "bus",
        description:
          "한국경제신문사 하차 - [간선] 370, 603 [지선] 7011, 7013A, 7013B, 7017",
        text: "한국경제신문사 하차",
      },
      {
        type: "bus",
        description:
          "경찰청·동북아역사재단 하차 - [간선] 103, 150, 701, 704, 708, 709, 742, 750A",
        text: "경찰청·동북아역사재단 하차",
      },
      {
        type: "bus",
        description: "서울역서부 하차 - [간선] 173, 261, 262, 463, 503, 604",
        text: "서울역서부 하차",
      },
    ],
    parking: "건물 내 지하 주차장 이용 가능 (2시간 무료)",
  },
  parents: {
    groom: {
      father: "김철범",
      mother: "이미영",
    },
    bride: {
      father: "김완기",
      mother: "이미희",
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
      groomAnswer: "서울 사당 근처에서 삶의 터전을 시작할 계획입니다.",
      brideAnswer: "사당에서 시작해 앞으로 함께 꾸려갈 예정이에요.",
    },
  ],
  guestbook: [
    {
      id: "1",
      author: "김민수 ( 이것은 예시 데이터 입니다. )",
      message: "결혼 진심으로 축하해! 행복하게 잘 살아~",
      date: "2025-10-20",
    },
    {
      id: "2",
      author: "박지영",
      message: "오빠 결혼 축하드려요! 언니도 예쁘시고 너무 잘 어울려요 ㅎㅎ",
      date: "2025-10-21",
    },
    {
      id: "3",
      author: "이준호",
      message: "드디어 결혼하는구나! 축하하고 평생 행복해라",
      date: "2025-10-21",
    },
    {
      id: "4",
      author: "최서연",
      message: "결혼 축하해요~ 두 분 앞날에 행복만 가득하길!",
      date: "2025-10-22",
    },
    {
      id: "5",
      author: "강동원",
      message: "형님 결혼 축하드립니다! 신혼여행 잘 다녀오세요 ^^",
      date: "2025-10-22",
    },
    {
      id: "6",
      author: "윤하나",
      message: "언니 너무 예쁘다ㅠㅠ 결혼 축하하고 백년해로 하세요!",
      date: "2025-10-23",
    },
    {
      id: "7",
      author: "정태양",
      message: "축하한다 친구야! 우리 다음엔 가족 모임 때 보자",
      date: "2025-10-23",
    },
    {
      id: "8",
      author: "송미래",
      message: "결혼 진심 축하해~ 두 분 너무 잘 어울려요 💕",
      date: "2025-10-24",
    },
    {
      id: "9",
      author: "황보민",
      message: "민태야 결혼 축하한다! 항상 행복하게 지내",
      date: "2025-10-24",
    },
    {
      id: "10",
      author: "안수진",
      message: "오빠 결혼 너무너무 축하드려요!! 건강하게 오래오래 사세요~",
      date: "2025-10-25",
    },
    {
      id: "11",
      author: "임재현",
      message: "결혼 축하해요! 신혼의 단꿈 꾸시길 바랍니다 ㅎㅎ",
      date: "2025-10-25",
    },
    {
      id: "12",
      author: "한소희",
      message: "언니 오빠 결혼 축하드려요💒 꽃길만 걸으세요!",
      date: "2025-10-26",
    },
    {
      id: "1",
      author: "김민수",
      message: "결혼 진심으로 축하해! 행복하게 잘 살아~",
      date: "2025-10-20",
    },
    {
      id: "2",
      author: "박지영",
      message: "오빠 결혼 축하드려요! 언니도 예쁘시고 너무 잘 어울려요 ㅎㅎ",
      date: "2025-10-21",
    },
    {
      id: "3",
      author: "이준호",
      message: "드디어 결혼하는구나! 축하하고 평생 행복해라",
      date: "2025-10-21",
    },
    {
      id: "4",
      author: "최서연",
      message: "결혼 축하해요~ 두 분 앞날에 행복만 가득하길!",
      date: "2025-10-22",
    },
    {
      id: "5",
      author: "강동원",
      message: "형님 결혼 축하드립니다! 신혼여행 잘 다녀오세요 ^^",
      date: "2025-10-22",
    },
    {
      id: "6",
      author: "윤하나",
      message: "언니 너무 예쁘다ㅠㅠ 결혼 축하하고 백년해로 하세요!",
      date: "2025-10-23",
    },
    {
      id: "7",
      author: "정태양",
      message: "축하한다 친구야! 우리 다음엔 가족 모임 때 보자",
      date: "2025-10-23",
    },
    {
      id: "8",
      author: "송미래",
      message: "결혼 진심 축하해~ 두 분 너무 잘 어울려요 💕",
      date: "2025-10-24",
    },
    {
      id: "9",
      author: "황보민",
      message: "민태야 결혼 축하한다! 항상 행복하게 지내",
      date: "2025-10-24",
    },
    {
      id: "10",
      author: "안수진",
      message: "오빠 결혼 너무너무 축하드려요!! 건강하게 오래오래 사세요~",
      date: "2025-10-25",
    },
    {
      id: "11",
      author: "임재현",
      message: "결혼 축하해요! 신혼의 단꿈 꾸시길 바랍니다 ㅎㅎ",
      date: "2025-10-25",
    },
    {
      id: "12",
      author: "한소희",
      message: "언니 오빠 결혼 축하드려요💒 꽃길만 걸으세요!",
      date: "2025-10-26",
    },
  ],
  accounts: {
    groom: [
      {
        holder: "김민태",
        bank: "카카오뱅크",
        accountNumber: "123-456-789012",
      },
      {
        holder: "이미영",
        bank: "신한은행",
        accountNumber: "110-123-456789",
      },
      {
        holder: "김철범",
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
        holder: "이미희",
        bank: "KB국민은행",
        accountNumber: "123456-01-123456",
      },
      {
        holder: "김완기",
        bank: "KB국민은행",
        accountNumber: "123456-01-123456",
      },
    ],
  },
};
