import React from 'react';
import type { WeddingData } from '../types';

interface LocationProps {
  data: WeddingData;
}

export const Location: React.FC<LocationProps> = ({ data }) => {
  return (
    <section className="location-section">
      <h2 className="section-title">LOCATION</h2>
      <p className="section-subtitle">오시는 길</p>

      <div className="location-content">
        <div className="venue-info">
          <h3 className="venue-name">{data.venue.name}</h3>
          <p className="venue-address">{data.venue.address}</p>
          <p className="venue-detail">
            {data.venue.floor} {data.venue.hall}
          </p>
          <p className="venue-phone">Tel. {data.venue.phone}</p>
        </div>

        <div className="map-placeholder">
          <div className="map-box">
            <p className="placeholder-text">지도 영역</p>
            <p className="placeholder-text">네이버 지도 API 연동</p>
          </div>
        </div>

        <div className="transportation-info">
          <h3 className="info-title">교통편 안내</h3>
          {data.venue.transportation.map((transport, index) => (
            <div key={index} className="transport-item">
              <span className="transport-icon">
                {transport.type === 'subway' && '🚇'}
                {transport.type === 'bus' && '🚌'}
                {transport.type === 'shuttle' && '🚐'}
              </span>
              <p className="transport-description">{transport.description}</p>
            </div>
          ))}

          <div className="parking-info">
            <h4 className="parking-title">주차 안내</h4>
            <p className="parking-description">{data.venue.parking}</p>
          </div>
        </div>

        <div className="map-buttons">
          <button className="map-btn naver-map">네이버 지도</button>
          <button className="map-btn kakao-map">카카오맵</button>
          <button className="map-btn tmap">티맵</button>
        </div>
      </div>
    </section>
  );
};
