import React from "react";

export const Information: React.FC = () => {
  const infoCards = [
    {
      title: "연회 안내",
      content: "식사는 뷔페로 진행됩니다.\n예식 전후로 식사 가능합니다.",
    },
    {
      title: "버스 안내",
      content: "서울역 출발: 오후 12:30\n강남역 출발: 오후 1:00",
    },
    {
      title: "식사 메뉴",
      content: "한식, 양식, 일식 뷔페\n다양한 메뉴를 준비했습니다.",
    },
  ];

  return (
    <section className="information-section">
      <h2 className="section-title">INFORMATION</h2>
      <p className="section-subtitle">예식 정보</p>

      <div className="info-card-list">
        {infoCards.map((card, index) => (
          <div className="info-card" key={index}>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-content">{card.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
