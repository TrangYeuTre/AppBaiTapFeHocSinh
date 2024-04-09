import Image from "next/image";

export default function ImagePreview({ url }) {
  return (
    <Image
      src={url}
      alt="Hình minh họa bài tập"
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
      }}
      width={500}
      height={300}
    />
  );
}
