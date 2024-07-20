import CardHomework from "../UI/CardHomework";
import HomeworkActionsBar from "./HomeworkActionsBar";
import BlockContentBar from "../UI/BlockContentBar";
// import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import { HwsRenderActions } from "../../store/hwsRenderSlice";
import { manipulateWithLocalStorage } from "../../helper/uti";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";
import dynamic from "next/dynamic";

const ImagePreview = dynamic(() => import("../UI/ImagePreview"), {
  loading: () => <p>Tải hình...</p>, // This will be shown while the component is loading
  ssr: false, // This disables server-side rendering for the component
});

export default function HomeworkTypeTracNghiem({
  homeworkData,
  validSubmit,
  hocSinh,
}) {
  const { renderDatas, cauHoi } = homeworkData;
  const dispatch = useDispatch();
  const updatingStore = useSelector((state) => state.hws.updatingStore);
  const blockHomework = useMemo(() => {
    return homeworkData.soLanNop >= 3;
  }, [homeworkData]);

  const [studentDo, setStudentDo] = useState(false);
  const [options, setOptions] = useState([]);
  const [localError, setLocalErorr] = useState("");

  const temporatyAnswer = useMemo(() => {
    return manipulateWithLocalStorage({
      order: "get",
      idBaiTap: homeworkData.idBaiTapVeNhaCon,
    });
  }, [homeworkData.idBaiTapVeNhaCon]);

  useEffect(() => {
    const optionsRender = renderDatas.options.map((opt) => {
      return { ...opt, isSelected: false };
    });

    if (temporatyAnswer) {
      const activeOption = optionsRender.find(
        (option) => option.id === temporatyAnswer
      );
      if (activeOption) activeOption.isSelected = true;
    }

    setOptions(optionsRender);
  }, [renderDatas]);

  const selectOption = (optId) => {
    setStudentDo(true);
    setOptions((preState) => {
      const cloneOptions = [...preState];
      cloneOptions.forEach((option) => (option.isSelected = false));
      const targetOption = cloneOptions.find((option) => option.id === optId);
      if (targetOption) targetOption.isSelected = true;
      return cloneOptions;
    });
  };

  const layDapAnCuaHocSinh = () => {
    const luaChonCuaHocSinh = getSelectedOption(options);

    if (!luaChonCuaHocSinh || Object.keys(luaChonCuaHocSinh).length === 0) {
      setLocalErorr("Chưa chọn đáp án.");
      setTimeout(() => {
        const errorElement = document.getElementById(
          `local-error-message-true-false-${homeworkData.idBaiTapVeNhaCon}`
        );
        if (errorElement) errorElement.scrollIntoView({ behavior: "smooth" });
      }, 100);

      return;
    } else {
      setLocalErorr("");
    }

    const updatedData = {
      idBaiTapVeNhaCon: homeworkData.idBaiTapVeNhaCon,
      content: luaChonCuaHocSinh.id,
    };

    dispatch(HwsActions.updateAnswersTrueFalse(updatedData));

    if (!updatingStore) {
      manipulateWithLocalStorage({
        order: "set",
        idBaiTap: updatedData.idBaiTapVeNhaCon,
        content: updatedData.content,
      });
    }

    if (!updatingStore) {
      dispatch(HwsRenderActions.increaseLoadOrdinalNumber());
    }
  };

  const getSelectedOption = (options) => {
    return options.find((option) => option.isSelected);
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

          {renderDatas.imageUrl && <ImagePreview url={renderDatas.imageUrl} />}

          <Status tinhTrang={renderDatas.tinhTrang} />
          <hr className="line-gray" />

          <div className="card-homework-student-work-wrapper">
            {cauHoi && (
              <h1 className="text-coWhite font-semibold p-2 bg-coRed rounded-md">
                Câu hỏi: {renderDatas.tenBaiTap}
              </h1>
            )}

            <p className="guide-text">Bé hãy chọn đáp án đúng</p>
            {localError && (
              <p
                id={`local-error-message-true-false-${homeworkData.idBaiTapVeNhaCon}`}
                className="error-text"
              >
                {localError}
              </p>
            )}

            <div className="true-false-options-wrapper">
              {options.length > 0 &&
                options.map((opt) => (
                  <div
                    key={Math.random().toString() + opt.id}
                    className={
                      opt.isSelected ? "option-item-selected" : "option-item"
                    }
                    onClick={selectOption.bind(this, opt.id)}
                  >
                    {opt.content}
                  </div>
                ))}
            </div>
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
