import CardHomework from "../UI/CardHomework";
import HomeworkActionsBar from "./HomeworkActionsBar";
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

export default function HomeworkTypeDienKhuyet({
  homeworkData,
  validSubmit,
  hocSinh,
}) {
  const { renderDatas } = homeworkData;
  const dispatch = useDispatch();
  const [localError, setLocalErorr] = useState("");
  const [studentDo, setStudentDo] = useState(false);
  const updatingStore = useSelector((state) => state.hws.updatingStore);
  const blockHomework = useMemo(() => {
    return homeworkData.soLanNop >= 3;
  }, [homeworkData]);

  const cauTraLoiCuaHocSinhRef = useRef();

  const enteredAnswer = () => {
    setTimeout(() => {
      setStudentDo(true);
    }, 3000);
  };
  const temporatyAnswer = useMemo(() => {
    return manipulateWithLocalStorage({
      order: "get",
      idBaiTap: homeworkData.idBaiTapDienKhuyet,
    });
  }, [homeworkData.idBaiTapDienKhuyet]);

  useEffect(() => {
    const answerElement = document.getElementById(
      `bai-lam-dien-khuyet-input-${homeworkData.idBaiTapDienKhuyet}`
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
      idBaiTapDienKhuyet: homeworkData.idBaiTapDienKhuyet,
      content: cauTraLoiCuaHocSinhRef.current.value || "",
    };

    if (!updatedData.content) {
      setLocalErorr("Chưa nhập nội dung câu trả lời");
      setTimeout(() => {
        const errorElement = document.getElementById(
          `local-error-message-fill-empty-${homeworkData.idBaiTapDienKhuyet}`
        );
        if (errorElement) errorElement.scrollIntoView({ behavior: "smooth" });
      }, 100);

      return;
    } else {
      setLocalErorr("");
    }

    dispatch(HwsActions.updateAnswersFillEmpty(updatedData));

    if (!updatingStore) {
      manipulateWithLocalStorage({
        order: "set",
        idBaiTap: updatedData.idBaiTapDienKhuyet,
        content: updatedData.content,
      });
    }

    if (!updatingStore) {
      cauTraLoiCuaHocSinhRef.current.value = "";
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
            <p className="guide-text">Bé hãy điền đáp án vào chỗ trống</p>
            {localError && (
              <p
                id={`local-error-message-fill-empty-${homeworkData.idBaiTapDienKhuyet}`}
                className="error-text"
              >
                {localError}
              </p>
            )}
            {renderDatas.imageUrl === "/assets/404-error.png" && (
              <LoadImageFailMessage />
            )}

            {renderDatas.kieu === "Điền khuyết đầu" && (
              <DienKhuyetDau
                item={renderDatas}
                enteredAnswer={enteredAnswer}
                cauTraLoiCuaHocSinhRef={cauTraLoiCuaHocSinhRef}
                homeworkData={homeworkData}
              />
            )}
            {renderDatas.kieu === "Điền khuyết cuối" && (
              <DienKhuyetCuoi
                item={renderDatas}
                enteredAnswer={enteredAnswer}
                cauTraLoiCuaHocSinhRef={cauTraLoiCuaHocSinhRef}
                homeworkData={homeworkData}
              />
            )}
            {renderDatas.kieu === "Điền khuyết giữa" && (
              <DienKhuyetGiua
                item={renderDatas}
                enteredAnswer={enteredAnswer}
                cauTraLoiCuaHocSinhRef={cauTraLoiCuaHocSinhRef}
                homeworkData={homeworkData}
              />
            )}
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

const DienKhuyetDau = ({
  item,
  enteredAnswer,
  inputValue,
  cauTraLoiCuaHocSinhRef,
  homeworkData,
}) => {
  return (
    <div className="fill-empty-option">
      <input
        id={`bai-lam-dien-khuyet-input-${homeworkData.idBaiTapDienKhuyet}`}
        className="card-homework-input"
        type="text"
        required
        placeholder="Nhập đáp án..."
        minLength={2}
        onKeyDown={enteredAnswer}
        value={inputValue}
        ref={cauTraLoiCuaHocSinhRef}
      />
      <p>{item.ve1}</p>
    </div>
  );
};

const DienKhuyetGiua = ({
  item,
  enteredAnswer,
  inputValue,
  cauTraLoiCuaHocSinhRef,
  homeworkData,
}) => {
  return (
    <div className="fill-empty-option">
      <p>{item.ve1}</p>
      <input
        id={`bai-lam-dien-khuyet-input-${homeworkData.idBaiTapDienKhuyet}`}
        className="card-homework-input"
        type="text"
        required
        placeholder="Nhập đáp án..."
        minLength={2}
        onKeyDown={enteredAnswer}
        value={inputValue}
        ref={cauTraLoiCuaHocSinhRef}
      />
      <p>{item.ve2}</p>
    </div>
  );
};
const DienKhuyetCuoi = ({
  item,
  enteredAnswer,
  inputValue,
  cauTraLoiCuaHocSinhRef,
  homeworkData,
}) => {
  return (
    <div className="fill-empty-option">
      <p>{item.ve1}</p>
      <input
        id={`bai-lam-dien-khuyet-input-${homeworkData.idBaiTapDienKhuyet}`}
        className="card-homework-input"
        type="text"
        required
        placeholder="Nhập đáp án..."
        minLength={2}
        onKeyDown={enteredAnswer}
        value={inputValue}
        ref={cauTraLoiCuaHocSinhRef}
      />
    </div>
  );
};
