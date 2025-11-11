import { useState, useRef, useEffect } from "react";
import { IoClose, IoMusicalNotes } from "react-icons/io5";

export const BgMusic = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // 볼륨 50%로 설정
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // 자동 재생이 차단된 경우 (브라우저 정책)
          console.log("Autoplay was prevented:", error);
          setIsPlaying(false);
        });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Play failed:", error);
          });
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/Howell-Magic.mp3" type="audio/mpeg" />
      </audio>

      <button
        className={`music-control-fixed ${isPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? "음악 정지" : "음악 재생"}
      >
        <IoMusicalNotes className="music-icon" />
        {!isPlaying && <IoClose className="music-off-icon" />}
      </button>
    </div>
  );
};
