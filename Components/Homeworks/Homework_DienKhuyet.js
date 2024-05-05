import Card from "../UI/Card";
import CardHomework from "../UI/CardHomework";
import HomeworkActionsBar from "./HomeworkActionsBar";
import LoadImageFailMessage from "../UI/LoadImageFailMessage";
import BlockContentBar from "../UI/BlockContentBar";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";

export default function HomeworkTypeDienKhuyet({ homeworkData }) {
  const { renderDatas } = homeworkData;
  console.log(homeworkData);
  const [inputValue, setInputValue] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [studentDo, setStudentDo] = useState(false);

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

  //   return <Card plusStyle={`p-0 w-full ${item.blockContent && "disabled-card"}`}>
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

      {/* <label>Đáp án</label> */}
      <div className="card-homework-student-work-wrapper">
        <p className="guide-text">Bé hãy điền đáp án vào chỗ trống</p>
        {renderDatas.imageUrl === "/assets/404-error.png" && (
          <LoadImageFailMessage />
        )}

        {renderDatas.kieu === "Điền khuyết đầu" && (
          <DienKhuyetDau
            item={renderDatas}
            handleChange={handleChange}
            inputValue={inputValue}
          />
        )}
        {renderDatas.kieu === "Điền khuyết cuối" && (
          <DienKhuyetCuoi
            item={renderDatas}
            handleChange={handleChange}
            inputValue={inputValue}
          />
        )}
        {renderDatas.kieu === "Điền khuyết giữa" && (
          <DienKhuyetGiua
            item={renderDatas}
            handleChange={handleChange}
            inputValue={inputValue}
          />
        )}
      </div>
      {/* {item.blockContent && <BlockContentBar />} */}
      <HomeworkActionsBar
        doAction1={layDapAnCuaHocSinh}
        bounceButton={studentDo}
      />
    </CardHomework>
  );
}

const DienKhuyetDau = ({ item, handleChange, inputValue }) => {
  return (
    <div className="fill-empty-option">
      <input
        className="card-homework-input"
        type="text"
        required
        placeholder="Nhập đáp án..."
        minLength={2}
        autofocus
        onChange={handleChange}
        value={inputValue}
      />
      <p>{item.ve1}</p>
    </div>
  );
};

const DienKhuyetGiua = ({ item, handleChange, inputValue }) => {
  return (
    <div className="fill-empty-option">
      <p>{item.ve1}</p>
      <input
        className="card-homework-input"
        type="text"
        required
        placeholder="Nhập đáp án..."
        minLength={2}
        autofocus
        onChange={handleChange}
        value={inputValue}
      />
      <p>{item.ve2}</p>
    </div>
  );
};
const DienKhuyetCuoi = ({ item, handleChange, inputValue }) => {
  return (
    <div className="fill-empty-option">
      <p>{item.ve1}</p>
      <input
        className="card-homework-input"
        type="text"
        required
        placeholder="Nhập đáp án..."
        minLength={2}
        autofocus
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
};
