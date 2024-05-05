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

export default function HomeworkTypeTracNghiem({ homeworkData }) {
  const { renderDatas } = homeworkData;

  const [studentDo, setStudentDo] = useState(false);

  //TODO: update lên store hws đây
  const layDapAnCuaHocSinh = (optId) => {
    console.log("Click chứ")
    setStudentDo(true);
  };

  return (
    <CardHomework>
      <AutoResizeTextarea
        inputValue={`Đề bài: ${renderDatas.deBai || null}`}
        ordinalNumber={homeworkData.ordinalNumber || ""}
      />
      <hr className="line-gray" />

      {renderDatas.imageUrl && <ImagePreview url={renderDatas.imageUrl} />}
      <Status tinhTrang={renderDatas.tinhTrang} />
      <hr className="line-gray" />

      <div className="card-homework-student-work-wrapper">
        <p className="guide-text">Bé hãy chọn đáp án đúng</p>
        <div className="true-false-options-wrapper">
          {renderDatas.options.length > 0 &&
            renderDatas.options.map((opt) => (
              <div
                key={Math.random().toString() + opt.id}
                className={
                  opt.isSelected && showStudentAnswers
                    ? "option-item-selected"
                    : "option-item"
                }
                onClick={layDapAnCuaHocSinh.bind(this, opt.id)}
              >
                {opt.content}
              </div>
            ))}
        </div>
      </div>

      {/* {blockContent && <BlockContentBar />} */}
      <HomeworkActionsBar
        doAction1={layDapAnCuaHocSinh}
        bounceButton={studentDo}
      />
    </CardHomework>
  );
}
