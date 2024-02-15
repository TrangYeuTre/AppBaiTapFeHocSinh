import Card from "./Card";
import Image from "next/image";
const Loading = (props) => {
  return (
    <Card plusStyle="w-1/2 flex flex-col items-center justify-center gap-2 mt-12 py-4">
      <Image
        src="/assets/dogrun.gif"
        alt="loading..."
        width={300}
        height={300}
      />
      <p className="text-xl text-coPink">Đang load nội dung...</p>
    </Card>
  );
};

export default Loading;
