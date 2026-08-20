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

        {/* 두 사람 프로필 카드: 사진 + 소개(생년월일·지역·태그) + 부모님 + 다짐 + 연락 */}
        <div className="profile-intro">
          <p className="profile-heading">두 사람을 소개합니다.</p>
          <div className="profile-cards">
            {(
              [
                {
                  role: "신랑",
                  person: data.groom,
                  parents: data.parents.groom,
                },
                {
                  role: "신부",
                  person: data.bride,
                  parents: data.parents.bride,
                },
              ] as const
            ).map(({ role, person, parents }) => (
              <div className="profile-card" key={role}>
                <img
                  className="profile-photo"
                  src={person.profile.photo}
                  alt={`${role} ${person.name}`}
                  loading="lazy"
                />
                <p className="profile-name">
                  <span className="profile-role">{role}</span>
                  {person.name}
                </p>
                <hr className="profile-divider" />
                <p className="profile-line">{person.profile.birth}</p>
                <p className="profile-line">{person.profile.region}</p>
                <p className="profile-line profile-tags">
                  {person.profile.tags.join(" ")}
                </p>
                <p className="profile-parents">
                  {parents.father} · {parents.mother}의 {person.relation}
                </p>
                {/* 데이터의 phone이 아직 목번호라 tel: 연결을 보류한다 —
                    실번호 반영 시 onClick으로 `tel:${person.phone}`을 연다. */}
                <button className="contact-btn">연락하기</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
