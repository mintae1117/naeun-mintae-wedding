import React from "react";
import { FaSubway, FaBus, FaShuttleVan } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import type { WeddingData } from "../types";

interface LocationProps {
  data: WeddingData;
}

export const Location: React.FC<LocationProps> = ({ data }) => {
  const handleNaverMap = () => {
    window.open(
      "https://map.naver.com/p/search/아벤티움%20웨딩%20서울?c=15.00,0,0,0,dh",
      "_blank"
    );
  };

  const handleKakaoMap = () => {
    window.open(
      "https://map.kakao.com/link/map/아벤티움 웨딩 서울,37.5606354720402,126.96576637587354",
      "_blank"
    );
  };

  const handleTmap = () => {
    window.open("https://tmap.life/cd1e9ac5", "_blank");
  };

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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.763497834203!2d126.96576637587354!3d37.5606354720402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3e6071c73b5%3A0x1488b7d00e97fa63!2z7JWE67Kk7Yuw7JuAIOybqOuUqe2ZgA!5e0!3m2!1sko!2skr!4v1762747136736!5m2!1sko!2skr"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="아벤티움 웨딩 서울 지도"
          ></iframe>
        </div>

        <div className="transportation-info">
          <h3 className="info-title">교통편 안내</h3>
          {data.venue.transportation.map((transport, index) => (
            <div key={index} className="transport-item">
              <span className="transport-icon">
                {transport.type === "subway" && <FaSubway />}
                {transport.type === "bus" && <FaBus />}
                {transport.type === "shuttle" && <FaShuttleVan />}
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
          <button className="map-btn naver-map" onClick={handleNaverMap}>
            <SiNaver className="map-btn-icon" />
            네이버 지도
          </button>
          <button className="map-btn kakao-map" onClick={handleKakaoMap}>
            <span className="map-btn-icon kakao-icon">K</span>
            카카오맵
          </button>
          <button className="map-btn tmap" onClick={handleTmap}>
            <span className="map-btn-icon tmap-icon">T</span>
            티맵
          </button>
        </div>
      </div>
    </section>
  );
};
