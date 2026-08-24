import type { WeddingData } from "../types";
import { getCatImages, getGalleryImages, getImageUrl, IMAGE_FILES } from "../config/r2";

export const mockWeddingData: WeddingData = {
  groom: {
    name: "김민태",
    englishName: "Kim Mintae",
    phone: "010-2245-8201",
    father: "김철범",
    mother: "이미영",
    relation: "장남",
    profile: {
      photo: getImageUrl(IMAGE_FILES.profile.groom),
      birth: "1996년 4월 11일",
      tags: ["#ISFJ", "#강아지", "#순딩왕자", "#러닝좋아"],
    },
  },
  bride: {
    name: "김나은",
    englishName: "Kim Naeun",
    phone: "010-4775-5909",
    father: "김완기",
    mother: "이미희",
    relation: "차녀",
    profile: {
      photo: getImageUrl(IMAGE_FILES.profile.bride),
      birth: "1994년 12월 3일",
      tags: ["#ENTP", "#고양이", "#미소천사", "#빵좋아"],
    },
  },
  weddingDate: "2026.10.25 (일요일)",
  weddingTime: "오후 2시",
  venue: {
    name: "채플웨딩홀 아벤티움",
    address: "서울특별시 중구 청파로 464 브라운스톤서울",
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
    parking: [
      "본관주차장, 별관주차장 이용 가능 (2시간 무료)",
      "[별관주차장] 서소문공원 (중구 칠패로 5)",
      "[본관주차장] 브라운스톤서울 (중구 청파로 464)",
    ],
    parkingNote:
      "별관(서소문공원) 주차장을 이용하시면 더욱 여유롭게 주차하실 수 있어요.",
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
      question: "결혼을 결심하게 된 이유는?",
      answer:
        "같이 있을 때 가장 즐겁고 편안한 사람이에요. 서로 닮은 점도 다른 점도 많겠지만, '우리'로 살아가는 소중함을 감사히 여기며 평생 함께 하고 싶어요.",
    },
    {
      question: "신혼여행은 어디로 가나요?",
      answer:
        "결혼식을 마치고 일주일 후, 자연이 아름다운 나라 뉴질랜드로 2주간 떠날 예정이에요. 맑은 공기와 탁트인 절경을 보며 힐링하고 오겠습니다!",
    },
    {
      question: "두 사람의 작은 가족을 소개해주세요!",
      answer:
        "저희에게는 두 딸이 있는데요, 바로 신부가 7년째 함께 하고 있는 고양이 고래와 도래에요. 고래와 도래는 19년 2월에 함께 태어난 자매예요. 한 배에서 나왔지만 다리 길이도 털 색깔도 다르답니다. 엄마 아빠를 너무나 좋아하는 저희의 딸, 회색 작은 고양이 고래와 갈색 대왕 고양이 도래를 소개합니다!",
      photos: getCatImages(),
    },
  ],
  guestbook: [
    {
      id: "1",
      author: "김민수 ( 예시 데이터 )",
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
        bank: "KB국민은행",
        accountNumber: "217802-04-526902",
      },
      {
        holder: "이미영",
        bank: "KB국민은행",
        accountNumber: "105-21-0346-759",
      },
      {
        holder: "김철범",
        bank: "신협은행",
        accountNumber: "137-009-425634",
      },
    ],
    bride: [
      {
        holder: "김나은",
        bank: "케이뱅크",
        accountNumber: "100-122-090010",
      },
      {
        holder: "이미희",
        bank: "농협은행",
        accountNumber: "815076-56-094334",
      },
      {
        holder: "김완기",
        bank: "카카오뱅크",
        accountNumber: "3333-13-1260757",
      },
    ],
  },
};
