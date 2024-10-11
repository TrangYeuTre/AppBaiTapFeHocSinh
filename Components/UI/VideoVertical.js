import React, { useRef, useState } from "react";
import YouTube from "react-youtube";

export default function VideoVertical({
  videoYoutubeId = "KpALivUQ1fo",
  startAt = 20,
}) {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(startAt);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  };

  // Kiểm tra nếu window có sẵn trên client
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="p-4 rounded-xl border-4 border-coRed2 w-fit mx-auto">
      <YouTube
        videoId={videoYoutubeId}
        opts={{
          height: "800",
          width: "450",
          playerVars: {
            autoplay: 0,
            origin: origin, // Sử dụng origin chỉ khi có window
          },
        }}
        onReady={onReady}
      />
      <div className="flex flex-row gap-2 items-center justify-center my-2">
        <button
          className="btn-shape btn-shape-try"
          onClick={() => handlePlay()}
          disabled={isPlaying}
        >
          Phát
        </button>
        <button
          className="btn-shape btn-shape-try"
          onClick={handlePause}
          disabled={!isPlaying}
        >
          Dừng
        </button>
      </div>
    </div>
  );
}
