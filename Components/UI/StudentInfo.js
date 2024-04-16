import { useSelector, useDispatch } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import { useState } from "react";

export default function StudentInfo({ username }) {
  const dispatch = useDispatch();
  const showStudentAnswers = useSelector(
    (state) => state.hws.showStudentAnswers
  );

  const [showGuide, setShowGuide] = useState(false);

  const showGuildeHandler = () => setShowGuide((preState) => !preState);

  const showHideStudentAnwersHandler = () => {
    if (showStudentAnswers) {
      dispatch(HwsActions.hideStudentAnswers());
    } else {
      dispatch(HwsActions.showStudentAnswers());
    }
  };

  return (
    <div className="flex flex-col flex-1 flex-wrap gap-2 border-4 bg-coWhite border-coGreen p-4 rounded-md shadow-xl">
      <p>
        Học sinh: <span className="font-semibold text-coRed">{username}</span>
      </p>
      <div className="flex flex-row flex-1 gap-3 ">
        <p>
          {showStudentAnswers
            ? "Để làm lại toàn bộ bài tập, ấn nút ->"
            : "Xem lại bài đã làm của học sinh, ấn nút ->"}
        </p>
        <button
          type="button"
          className="btn btn-main w-fit mx-0"
          onClick={showHideStudentAnwersHandler}
        >
          {showStudentAnswers ? "Ẩn" : "Xem "}
        </button>
      </div>
      <div className="flex flex-row flex-1 gap-3 ">
        <p className="text-coRed italic">Xem hướng dẫn làm bài</p>
        <button
          type="button"
          className="btn btn-main w-fit mx-0"
          onClick={showGuildeHandler}
        >
          {showGuide ? "Ẩn" : "Xem "}
        </button>
      </div>
      <div className=" p-2 bg-coGray5 rounded-lg">
        {showGuide && (
          <ol className="list-decimal px-6 flex flex-col gap-3">
            <li className="italic ">
              Để có trải nghiệm tốt nhất bố mẹ nên cho bé làm bài tập trên thiết
              bị có màn hình lớn như: ipad, laptop...
            </li>
            <li className="italic ">
              Dạng bài trắc nghiệm và matching: chọn (click) vào đáp án bé cho
              là đúng.
            </li>
            <li className="italic ">
              Dạng bài điền khuyết và viết: bé nhập câu trả lời vào ô trống. Sau
              khi nhập xong <span className="font-bold text-coRed">phải</span>{" "}
              bấm nút <span className="font-bold text-coBlue1">Xác nhận</span>{" "}
              để cập nhật đáp án cho câu đó.
            </li>
            <li className="italic ">
              Sau khi đã làm hết tất cả bài tập được giao, bé hãy bấm nút{" "}
              <span className="font-bold text-coPink">NỘP BÀI</span> ở dưới cùng
              để nộp bài cho cô Trang chấm điểm. Chú ý: nếu không làm đủ bài tập
              thì sẽ không NỘP BÀI được.
            </li>
            <li className="italic ">
              Quan trọng: trong một đợt bài tập, bé chỉ được bấm nút NỘP BÀI
              <span className="font-bold text-coBlue1"> 3 lần</span>. Do đó, bé
              hãy cố gắng làm bài thật kĩ trước khi nộp.
            </li>
            <li className="italic ">
              Những bài tập có dòng thông báo{" "}
              <span className="font-bold text-coRed">
                hết lượt làm bài tập này
              </span>{" "}
              có nghĩa là bé không thể chỉnh sửa và nộp lại được nữa.
            </li>
          </ol>
        )}
      </div>
    </div>
  );
}
