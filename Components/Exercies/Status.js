export default function Status({ tinhTrang }) {
  return (
    <div className="flex flex-1 flex-row gap-4 justify-center items-center my-2 opacity-50">
      <div
        className={`myStatus ${tinhTrang === "Chưa nộp" && "myStatus-active"}`}
      >
        Chưa nộp
      </div>
      <div
        className={`myStatus ${tinhTrang === "Đã nộp" && "myStatus-active"}`}
      >
        Đã nộp
      </div>
      <div
        className={`myStatus ${tinhTrang === "Đã sửa" && "myStatus-active"}`}
      >
        Đã sửa
      </div>
    </div>
  );
}
