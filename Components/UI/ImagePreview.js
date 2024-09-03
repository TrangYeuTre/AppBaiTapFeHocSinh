import Image from "next/image";
import { useState } from "react";
import WatermarkCanvas from "./WatermarkCanvas";

export default function ImagePreview({ url }) {
  const [isLoading, setIsLoading] = useState(true);

  const setImageLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div
      className=" w-full relative bg-watermark
    h-[200px] sm:max-2xl:h-[300px] 2xl:h-[400px] "
    >
      {isLoading && <p className="text-coGreen text-xl">Đang tải hình...⏳</p>}
      <WatermarkCanvas
        text="trangyeutre.com"
        rotation={-5}
        color="rgba(39, 187, 245, 0.15)"
        fontSize={50}
      />
      <Image
        src={url}
        alt="Hình minh họa bài tập"
        fill={true}
        onLoad={setImageLoaded}
        style={{
          objectFit: "contain",
          objectPosition: "center",
          placeholder: "blur", // Sử dụng placeholder blur của next/image
          blurDataURL: "/assets/404.png", // Đường dẫn đến ảnh placeholder nhỏ
        }}
      />
      {/* <div
        className="absolute bottom-0 w-full opacity-80
      h-[50px] sm:max-2xl:h-[60px] 2xl:h-[70px]"
      >
        <Image
          src="/assets/watermark.png"
          alt="Logo Cô Trang"
          fill={true}
          style={{ objectFit: "contain", objectPosition: "center" }}
          // objectFit="contain"
          // objectPosition="center"
        />
      </div> */}
    </div>
  );
}
