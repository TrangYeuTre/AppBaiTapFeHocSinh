import Card from "../UI/Card";
import CardHomework from "../UI/CardHomework";
import LoadImageFailMessage from "../UI/LoadImageFailMessage";
import BlockContentBar from "../UI/BlockContentBar";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import { HwsRenderActions } from "../../store/hwsRenderSlice";
import { manipulateWithLocalStorage } from "../../helper/uti";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";
import HomeworkActionsBar from "./HomeworkActionsBar";

export default function HomeworkTypeViet({
  homeworkData,
  validSubmit,
  hocSinh,
}) {
  const { renderDatas } = homeworkData;
  const dispatch = useDispatch();
  const updatingStore = useSelector((state) => state.hws.updatingStore);
  const cauTraLoiCuaHocSinhRef = useRef();
  const blockHomework = useMemo(() => {
    return homeworkData.soLanNop >= 3;
  }, [homeworkData]);

  const [localError, setLocalErorr] = useState("");
  const [studentDo, setStudentDo] = useState(false);

  const enteredAnswer = () => {
    setTimeout(() => {
      setStudentDo(true);
    }, 3000);
  };
  const temporatyAnswer = useMemo(() => {
    return manipulateWithLocalStorage({
      order: "get",
      idBaiTap: homeworkData.idBaiTapViet,
    });
  }, [homeworkData.idBaiTapViet]);

  useEffect(() => {
    const answerElement = document.getElementById(
      `bai-lam-viet-textarea-${homeworkData.idBaiTapViet}`
    );
    if (!temporatyAnswer) answerElement.focus();

    if (
      temporatyAnswer &&
      cauTraLoiCuaHocSinhRef &&
      cauTraLoiCuaHocSinhRef.current
    ) {
      cauTraLoiCuaHocSinhRef.current.value = temporatyAnswer;
    }
  }, [temporatyAnswer, renderDatas]);

  const layDapAnCuaHocSinh = () => {
    setStudentDo(false);
    const updatedData = {
      idBaiTapVeNhaCon: homeworkData.idBaiTapVeNhaCon,
      idBaiTapViet: homeworkData.idBaiTapViet,
      content: cauTraLoiCuaHocSinhRef.current.value || "",
    };

    if (!updatedData.content) {
      setLocalErorr("Chưa nhập nội dung câu trả lời");
      setTimeout(() => {
        const errorElement = document.getElementById(
          `local-error-message-writting-${homeworkData.idBaiTapViet}`
        );
        if (errorElement) errorElement.scrollIntoView({ behavior: "smooth" });
      }, 100);

      return;
    } else {
      setLocalErorr("");
    }

    dispatch(HwsActions.updateAnswersWriting(updatedData));

    if (!updatingStore) {
      manipulateWithLocalStorage({
        order: "set",
        idBaiTap: updatedData.idBaiTapViet,
        content: updatedData.content,
      });
    }

    if (!updatingStore) {
      if (!validSubmit) cauTraLoiCuaHocSinhRef.current.value = "";
      dispatch(HwsRenderActions.increaseLoadOrdinalNumber());
      cauTraLoiCuaHocSinhRef.current.focus();
    }
  };
  return (
    <CardHomework>
      {validSubmit && (
        <div className="homework-all-done-wrapper">
          <p>Chúc mừng bé đã làm hết bài tập. 🎉🎉🎉</p>
          <p>Nhớ bấm nút NỘP BÀI bên dưới để cô Trang chấm bài nhé</p>
        </div>
      )}
      {!validSubmit && (
        <div className={blockHomework ? "disabled-homework-card" : null}>
          <AutoResizeTextarea
            inputValue={`Đề bài: ${renderDatas.deBai || null}`}
            ordinalNumber={homeworkData.ordinalNumber || ""}
          />
          <hr className="line-gray" />

          <ImagePreview url={renderDatas.imageUrl} />
          <Status tinhTrang={renderDatas.tinhTrang} />
          <hr className="line-gray" />

          <div className="card-homework-student-work-wrapper">
            <p
              className={`guide-text ${
                renderDatas.cauHoi &&
                "text-coWhite font-semibold p-2 bg-coRed rounded-md"
              }`}
            >
              {renderDatas.cauHoi
                ? `Câu hỏi: ${renderDatas.cauHoi}`
                : "Bé hãy điền đáp án vào chỗ trống"}
            </p>
            {localError && (
              <p
                id={`local-error-message-writting-${homeworkData.idBaiTapViet}`}
                className="error-text"
              >
                {localError}
              </p>
            )}
            {renderDatas.imageUrl === "/assets/404-error.png" && (
              <LoadImageFailMessage />
            )}

            <textarea
              id={`bai-lam-viet-textarea-${homeworkData.idBaiTapViet}`}
              onKeyDown={enteredAnswer}
              ref={cauTraLoiCuaHocSinhRef}
              required
              placeholder="Nhập đáp án vào đây..."
              className="card-homework-textarea"
              minLength={3}
              disabled={
                renderDatas.imageUrl === "/assets/404-error.png" ? true : null
              }
            />
          </div>
          {blockHomework && <BlockContentBar />}
        </div>
      )}

      <HomeworkActionsBar
        doAction1={layDapAnCuaHocSinh}
        pulseButton={studentDo}
        isLoading={updatingStore}
        validSubmit={validSubmit}
        hocSinh={hocSinh}
      />
    </CardHomework>
  );
}
