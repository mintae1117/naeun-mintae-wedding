import React from 'react';
import type { WeddingData } from '../types';

interface InterviewProps {
  data: WeddingData;
}

export const Interview: React.FC<InterviewProps> = ({ data }) => {
  return (
    <section className="interview-section">
      <h2 className="section-title">INTERVIEW</h2>
      <p className="section-subtitle">신랑 신부에게 물어보았습니다</p>

      <div className="interview-list">
        {data.interview.map((item, index) => (
          <div key={index} className="interview-item">
            <h3 className="interview-question">Q. {item.question}</h3>

            <div className="interview-answers">
              <div className="answer-box groom-answer">
                <span className="answer-label">신랑</span>
                <p className="answer-text">{item.groomAnswer}</p>
              </div>

              <div className="answer-box bride-answer">
                <span className="answer-label">신부</span>
                <p className="answer-text">{item.brideAnswer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
