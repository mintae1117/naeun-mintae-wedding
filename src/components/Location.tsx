/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { FaSubway, FaBus, FaShuttleVan } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import type { WeddingData } from "../types";

interface LocationProps {
  data: WeddingData;
}

declare global {
  interface Window {
    kakao: {
      maps: any;
    };
  }
}

export const Location: React.FC<LocationProps> = ({ data }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const handleNaverMap = () => {
    window.open("https://naver.me/FV7Yg9qI", "_blank");
  };

  const handleKakaoMap = () => {
    window.open("https://place.map.kakao.com/8282484", "_blank");
  };

  const handleTmap = () => {
    const placeName = "아벤티움";
    const longitude = 126.96814500189701;
    const latitude = 37.560983379051315;

    const tmapUrl = `tmap://route?rGoName=${encodeURIComponent(
      placeName
    )}&rGoX=${longitude}&rGoY=${latitude}`;
    window.open(tmapUrl, "_blank");
  };

  useEffect(() => {
    if (mapContainer.current && window.kakao) {
      const { kakao } = window;

      // 카카오맵 로드 확인
      if (kakao.maps) {
        // 아벤티움 웨딩 서울 좌표 (브라운스톤서울 3층)
        const position = new kakao.maps.LatLng(
          37.560983379051315,
          126.96814500189701
        );

        const options = {
          center: position,
          level: 3, // 지도 확대 레벨
          scrollwheel: false, // 마우스 휠 줌 비활성화
        };

        // 지도 생성
        const map = new kakao.maps.Map(mapContainer.current, options);

        // 줌 컨트롤 추가 (우측 상단에 +/- 버튼)
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 마커 생성
        const marker = new kakao.maps.Marker({
          position: position,
          map: map,
        });

        // 인포윈도우 생성
        const infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="padding:5px;font-size:12px;text-align:center;">채플 웨딩홀 아벤티움 서울</div>',
        });

        // 마커에 마우스오버 이벤트 등록
        kakao.maps.event.addListener(marker, "mouseover", () => {
          infowindow.open(map, marker);
        });

        // 마커에 마우스아웃 이벤트 등록
        kakao.maps.event.addListener(marker, "mouseout", () => {
          infowindow.close();
        });
      }
    }
  }, []);

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
          <div
            ref={mapContainer}
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "10px",
            }}
          ></div>
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
