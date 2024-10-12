import React, { useRef, useState } from "react";
import YouTube from "react-youtube";

export default function VideoVertical({
  videoYoutubeId = "",
  startAt = 0,
  onCloseModal,
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
    } else {
      console.error("Player is not ready");
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      console.error("Player is not ready");
    }
  };

  const handleContinue = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    } else {
      console.error("Player is not ready");
    }
  };

  return (
    <div className="h-full " id="video-youtube-container">
      <div
        style={{
          height: "65vh",
          width: "100%",
          aspectRatio: "9/16",
        }}
      >
        <YouTube
          videoId={videoYoutubeId}
          opts={{
            height: "100%",
            width: "100%",
            playerVars: {
              autoplay: 0,
            },
          }}
          onReady={onReady}
          className="w-full h-full"
        />
      </div>

      {/* Div chứa các button */}
      {/* <div className="absolute bottom-2 md:bottom-0 left-0 w-full"> */}
      <div className="h-20vh">
        <div className="flex flex-row flex-1 gap-2 p-2 my-2">
          <button className="btn-shape btn-shape-video" onClick={handlePlay}>
            Phát từ đầu
          </button>
          <button
            className="btn-shape btn-shape-video"
            onClick={handleContinue}
          >
            Phát
          </button>
          <button className="btn-shape btn-shape-video" onClick={handlePause}>
            Dừng
          </button>
          <button
            className="btn-shape btn-shape-ghost"
            onClick={() => {
              onCloseModal && onCloseModal();
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
