import Image from "next/image";

export default function ImagePreview({ url }) {
  return (
    <div
      className=" w-full relative
    h-[200px] sm:max-2xl:h-[300px] 2xl:h-[500px] "
    >
      <Image
        src={url}
        alt="Hình minh họa bài tập"
        fill={true}
        objectFit="contain"
        objectPosition="center"
      />
      <div
        className="absolute bottom-0 w-full opacity-80
      h-[50px] sm:max-2xl:h-[60px] 2xl:h-[70px]"
      >
        <Image
          src="/assets/watermark.png"
          fill={true}
          objectFit="contain"
          objectPosition="center"
        />
      </div>
    </div>
  );
}
