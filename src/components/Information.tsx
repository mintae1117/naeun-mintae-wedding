import React, { useState } from 'react';

export const Information: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const infoCards = [
    {
      title: '연회 안내',
      content: '식사는 뷔페로 진행됩니다.\n예식 전후로 식사 가능합니다.',
    },
    {
      title: '버스 안내',
      content: '서울역 출발: 오후 12:30\n강남역 출발: 오후 1:00',
    },
    {
      title: '식사 메뉴',
      content: '한식, 양식, 일식 뷔페\n다양한 메뉴를 준비했습니다.',
    },
  ];

  return (
    <section className="information-section">
      <h2 className="section-title">INFORMATION</h2>
      <p className="section-subtitle">예식 정보</p>

      <div className="info-slider">
        <div className="slider-indicators">
          {infoCards.map((_, index) => (
            <button
              key={index}
              className={`indicator ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>

        <div className="info-cards">
          <div
            className="cards-container"
            style={{ transform: `translateX(-${activeTab * 100}%)` }}
          >
            {infoCards.map((card, index) => (
              <div key={index} className="info-card">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-content">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
