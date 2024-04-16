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
    </div>
  );
}
