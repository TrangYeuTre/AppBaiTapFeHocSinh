import Image from "next/image";
import { Howl } from "howler";

export default function RightAnswerNoti({ dapAn }) {
  const rightSound = new Howl({
    src: "/sounds/rightAnswer.mp3",
    volume: 1,
  });
  rightSound.play();
  return (
    <div
      className="p-3 bg-coGreen2 flex flex-row flex-wrap 
gap-4 items-center justify-center"
    >
      <Image
        src="/assets/happy.gif"
        alt="Trả lời đúng"
        width={60}
        height={60}
      />
      <p className="uppercase text-2xl font-semibold text-coGreen">
        {dapAn.message}
      </p>
    </div>
  );
}
