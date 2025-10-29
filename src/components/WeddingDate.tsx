import React, { useState, useEffect, useMemo } from "react";

interface WeddingDateProps {
  weddingDate: string; // "2026.10.25"
  weddingTime: string; // "오후 2시"
}

export const WeddingDate: React.FC<WeddingDateProps> = ({
  weddingDate,
  weddingTime,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // useMemo로 메모이제이션 - 의존성이 변경될 때만 재계산
  const weddingDateTime = useMemo(() => {
    const dateOnly = weddingDate.split(" ")[0];
    const [year, month, day] = dateOnly.split(".").map(Number);
    return new Date(year, month - 1, day, 14, 0, 0);
  }, [weddingDate]); // weddingDate가 변경될 때만 재생성

  // 달력 생성도 useMemo로 최적화
  const { calendar, weddingDay } = useMemo(() => {
    const year = weddingDateTime.getFullYear();
    const month = weddingDateTime.getMonth();
    const weddingDay = weddingDateTime.getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const calendar = [];
    let week = [];

    // 빈 칸 채우기
    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    // 날짜 채우기
    for (let day = 1; day <= lastDate; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    // 마지막 주 채우기
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      calendar.push(week);
    }

    return { calendar, weddingDay };
  }, [weddingDateTime]);

  // 카운트다운 계산
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = weddingDateTime.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDateTime]); // 이제 안전합니다

  return (
    <section className="wedding-date-section">
      <h2 className="section-title">SAVE THE DATE</h2>
      <p className="section-subtitle">우리의 특별한 날을 기억해주세요</p>

      <div className="wedding-date-content">
        <div className="date-info">
          <p className="date-text">
            {weddingDate}
          </p>
          <p className="time-text">{weddingTime}</p>
        </div>

        <div className="calendar">
          <div className="calendar-header">
            <h3>
              {weddingDateTime.getFullYear()}.
              {String(weddingDateTime.getMonth() + 1).padStart(2, "0")}
            </h3>
          </div>
          <div className="calendar-days">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
              (day, idx) => (
                <div
                  key={day}
                  className={`calendar-day-label ${
                    idx === 0 || idx === 6 ? "weekend" : ""
                  }`}
                >
                  {day}
                </div>
              )
            )}
          </div>
          <div className="calendar-grid">
            {calendar.map((week, weekIdx) =>
              week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`calendar-date ${
                    day === weddingDay ? "wedding-day" : ""
                  } ${day === null ? "empty" : ""} ${
                    dayIdx === 0 || dayIdx === 6 ? "weekend" : ""
                  }`}
                >
                  {day}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="countdown">
          <p className="countdown-label">결혼식까지</p>
          <div className="countdown-timer">
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.days}</span>
              <span className="countdown-unit">DAYS</span>
            </div>
            <div className="countdown-divider">:</div>
            <div className="countdown-item">
              <span className="countdown-value">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="countdown-unit">HOURS</span>
            </div>
            <div className="countdown-divider">:</div>
            <div className="countdown-item">
              <span className="countdown-value">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="countdown-unit">MINUTES</span>
            </div>
            <div className="countdown-divider">:</div>
            <div className="countdown-item">
              <span className="countdown-value">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="countdown-unit">SECONDS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};