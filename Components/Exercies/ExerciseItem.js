import Card from "../UI/Card";
import Image from "next/image";
import { useRef } from "react";

export default function ExerciseItem({ exercise: ex }) {
  const dapAnRef = useRef();

  const nopBaiHandler = async (e) => {
    e.preventDefault();
    alert("Nộp con nhà bà bài");
  };

  return (
    <Card key={"Hello" + Math.random().toString()} plusStyle="p-0 w-full">
      <form onSubmit={nopBaiHandler}>
        <div className="flex flex-row justify-center p-6 pb-2">
          <h2>{ex.deBai}</h2>
        </div>
        {/* <hr className="border-b-2 border-coGray4 opacity-30" /> */}
        <div className="flex flex-col gap-3 bg-coGray5 px-3 py-6">
          <Image
            src={ex.hinhUri}
            alt={ex.ten}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
          />
          <div className="flex flex-1 flex-row gap-2 justify-center items-center my-2 opacity-50">
            <div
              className={`myTag ${ex.tinhTrang === "đã gởi" && "myTag2Light"}`}
            >
              Đã gởi
            </div>
            <div
              className={`myTag ${ex.tinhTrang === "đã nhận" && "myTag2Light"}`}
            >
              Đã nhận
            </div>
            <div
              className={`myTag ${ex.tinhTrang === "đã sửa" && "myTag2Light"}`}
            >
              Đã sửa
            </div>
          </div>
          <hr className="border-coWhite border-2" />
          <label>Đáp án</label>
          {ex.isInput && (
            <input
              required
              ref={dapAnRef}
              type="text"
              placeholder="Nhập đáp án vào đây..."
              className="w-full"
            />
          )}
          {!ex.isInput && (
            <textarea
              ref={dapAnRef}
              required
              placeholder="Nhập đáp án vào đây..."
              className="w-full h-32"
              minLength={3}
            />
          )}
        </div>
        <div className="flex flex-row justify-center p-4">
          <button type="submit" className="btn btn-submit">
            Nộp
          </button>
        </div>
      </form>
    </Card>
  );
}
