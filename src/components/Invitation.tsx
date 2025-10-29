import React from 'react';
import type { WeddingData } from '../types';

interface InvitationProps {
  data: WeddingData;
}

export const Invitation: React.FC<InvitationProps> = ({ data }) => {
  return (
    <section className="invitation-section">
      <h2 className="section-title">INVITATION</h2>
      <p className="section-subtitle">소중한 분들을 초대합니다</p>

      <div className="invitation-content">
        <div className="invitation-text">
          <p className="invitation-message">
            평생 서로 아끼고 사랑하며<br />
            행복한 가정을 이루고자 합니다.<br />
            <br />
            저희 두 사람이 사랑의 이름으로<br />
            하나가 되는 소중한 순간,<br />
            함께 하셔서 축복해 주시면<br />
            더없는 기쁨으로 간직하겠습니다.
          </p>
        </div>

        <div className="parents-info">
          <div className="parent-row">
            <div className="parent-side">
              <p className="parent-label">신랑</p>
              <p className="parent-names">
                {data.parents.groom.father} · {data.parents.groom.mother}
              </p>
              <p className="parent-relation">의 {data.groom.relation}</p>
              <p className="child-name">{data.groom.name}</p>
              <button className="contact-btn">연락하기</button>
            </div>
          </div>

          <div className="parent-row">
            <div className="parent-side">
              <p className="parent-label">신부</p>
              <p className="parent-names">
                {data.parents.bride.father} · {data.parents.bride.mother}
              </p>
              <p className="parent-relation">의 {data.bride.relation}</p>
              <p className="child-name">{data.bride.name}</p>
              <button className="contact-btn">연락하기</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
