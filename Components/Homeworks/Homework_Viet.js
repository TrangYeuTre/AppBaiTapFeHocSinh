import Card from "../UI/Card";
import CardHomework from "../UI/CardHomework";
import LoadImageFailMessage from "../UI/LoadImageFailMessage";
import BlockContentBar from "../UI/BlockContentBar";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";
import HomeworkActionsBar from "./HomeworkActionsBar";

export default function HomeworkTypeViet({ homeworkData }) {
  const { renderDatas } = homeworkData;
  const [studentDo, setStudentDo] = useState(false);
  useEffect(() => {
    const targetEle = document.getElementById(
      `bai-lam-viet-textarea-${homeworkData.idBaiTapViet}`
    );
    targetEle.focus();
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Xử lý khi thay đổi giá trị của input
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Xóa timeout hiện tại (nếu có)
    clearTimeout(typingTimeout);

    // Thiết lập timeout mới để kiểm tra nội dung sau 3 giây
    const newTimeout = setTimeout(() => {
      console.log("Nội dung hiện tại của input:", value);
      // Thực hiện các hành động kiểm tra hoặc xử lý dữ liệu ở đây
      if (value && value.length > 3) {
        setStudentDo(true);
      } else {
        setStudentDo(false);
      }
    }, 3000);

    // Cập nhật state cho timeout mới
    setTypingTimeout(newTimeout);
  };

  //TODO: update lên store hws đây
  const layDapAnCuaHocSinh = () => {};

  return (
    <CardHomework>
      <AutoResizeTextarea
        inputValue={`Đề bài: ${renderDatas.deBai || null}`}
        ordinalNumber={homeworkData.ordinalNumber || ""}
      />
      <hr className="line-gray" />

      <ImagePreview url={renderDatas.imageUrl} />
      <Status tinhTrang={renderDatas.tinhTrang} />
      <hr className="line-gray" />

      <div className="card-homework-student-work-wrapper">
        <p className="guide-text">Bé hãy điền đáp án vào chỗ trống</p>

        {renderDatas.imageUrl === "/assets/404-error.png" && (
          <LoadImageFailMessage />
        )}

        <textarea
          id={`bai-lam-viet-textarea-${homeworkData.idBaiTapViet}`}
          value={inputValue}
          onChange={handleChange}
          required
          placeholder="Nhập đáp án vào đây..."
          className="card-homework-textarea"
          minLength={3}
          disabled={
            renderDatas.imageUrl === "/assets/404-error.png" ? true : null
          }
        />
      </div>
      {/* {item.blockContent && <BlockContentBar />} */}
      <HomeworkActionsBar
        doAction1={layDapAnCuaHocSinh}
        bounceButton={studentDo}
      />
    </CardHomework>
  );
}
