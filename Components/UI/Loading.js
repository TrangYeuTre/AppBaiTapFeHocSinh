import Card from "./Card";
import Image from "next/image";
const Loading = (props) => {
  return (
    <Card plusStyle="w-1/2 flex flex-col items-center justify-center gap-2 mt-12 py-4">
      <div className="flex flex-col gap-6 justify-center items-center">
        <h1 className="font-bold text-2xl text-coRed uppercase">
          Đang tải dữ liệu...
        </h1>
        <Image
          src="/assets/loading.gif"
          alt="loading..."
          width={200}
          height={200}
        />
      </div>
    </Card>
  );
};

export default Loading;
