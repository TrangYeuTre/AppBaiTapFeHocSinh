import React, { useEffect, useRef } from "react";

const WatermarkCanvas = ({
  text,
  rotation = -30,
  color = "rgba(0, 0, 0, 0.1)",
  fontSize = 60,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 400; // Kích thước canvas
    canvas.height = 200;

    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.rotate((rotation * Math.PI) / 180); // Xoay văn bản
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const dataURL = canvas.toDataURL();
    document.body.style.setProperty("--watermark", `url(${dataURL})`);
  }, [text, rotation, color, fontSize]);

  return <canvas ref={canvasRef} style={{ display: "none" }} />;
};

export default WatermarkCanvas;
