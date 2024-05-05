export default function Status({ tinhTrang }) {
  return (
    <div className="exercise-status-wrapper">
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
