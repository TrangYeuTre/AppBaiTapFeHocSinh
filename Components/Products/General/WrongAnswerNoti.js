import Image from "next/image";

export default function WrongAnswerNoti({ dapAn }) {
  return (
    <div
      className="p-3 bg-coRed2 flex flex-row flex-wrap 
        gap-4 items-center justify-center"
    >
      <Image src="/assets/sad.gif" alt="Trả lời đúng" width={50} height={50} />
      <p className="uppercase text-2xl font-semibold text-coRed">
        Không chính xác. Đáp án là:{" "}
        <span className="text-coYellow">{dapAn.message}</span>
      </p>
    </div>
  );
}
