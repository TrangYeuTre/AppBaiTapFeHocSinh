import AutoResizeTextarea from "../Homeworks/AutoHeightTextarea";
import ImagePreview from "../UI/ImagePreview";
import Congratulation from "./General/Congratulation";
import RightAnswerNoti from "../Products/General/RightAnswerNoti";
import WrongAnswerNoti from "../Products/General/WrongAnswerNoti";
import { DienKhuyetExercise } from "../../classes/ClassifyExercise";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { scrollToElementId, devErrorMessage } from "../../helper/uti";

export default function ClassifyDienKhuyet({
  exerciseData,
  goToNextExercise,
  subscriptionInstance,
}) {
  const [state, setState] = useState({
    initLoadData: false,
    dienKhuyetData: null,
    checked: false,
    dapAn: { result: null, message: "" },
    congratulation: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    createInitData();
  }, [exerciseData]);

  useEffect(() => {
    if (state.dienKhuyetData) {
      state.dienKhuyetData.initClearAndFocusInput(
        `input-dk-${state.dienKhuyetData.inputId}`
      );
    }
    scrollToElementId("#1");
  }, [state.dienKhuyetData]);

  const createInitData = async () => {
    setState((prevState) => ({ ...prevState, initLoadData: true }));
    try {
      const dkData = new DienKhuyetExercise({
        ...exerciseData,
        cauHoi: "Bé hãy điền đáp án vào chỗ trống.",
      });

      await dkData.initLoadImage();
      setState((prevState) => ({ ...prevState, dienKhuyetData: dkData }));
    } catch (err) {
      devErrorMessage({ err, from: "/Components/Demo/Classify_DienKhuyet.js" });
    } finally {
      setState((prevState) => ({ ...prevState, initLoadData: false }));
    }
  };

  const checkResult = useCallback(
    (e) => {
      e.preventDefault();
      setState((prevState) => ({ ...prevState, checked: true }));
      const da = state.dienKhuyetData.getResult();

      if (da.result) {
        dispatch(SubscriptionAuthActions.countRightAnswer());
        dispatch(
          SubscriptionAuthActions.saveRightAnswer(state.dienKhuyetData._id)
        );
      } else {
        dispatch(
          SubscriptionAuthActions.saveWrongAnswer(state.dienKhuyetData._id)
        );
      }

      setState((prevState) => ({ ...prevState, dapAn: da }));
      scrollToElementId("#2");
    },
    [dispatch, state.dienKhuyetData]
  );

  const goToNextExerciseHandler = useCallback(
    (e) => {
      e.preventDefault();
      const currentExerciseIndex =
        subscriptionInstance.getCurrentExerciseIndex();

      if (
        currentExerciseIndex ===
        subscriptionInstance.getExercisesLength() - 1
      ) {
        setState((prevState) => ({ ...prevState, congratulation: true }));
      } else {
        setState((prevState) => ({
          ...prevState,
          checked: false,
          dapAn: { result: null, message: "" },
        }));
        goToNextExercise();
      }
    },
    [goToNextExercise, subscriptionInstance]
  );

  const showRightNoti = state.dapAn.result && state.dapAn.message;
  const showInitLoadData = !state.congratulation && state.initLoadData;
  const showExerciseContent =
    !state.congratulation && !state.initLoadData && state.dienKhuyetData;

  return (
    <>
      {showInitLoadData && (
        <p className="text-coGreen text-center italic">Đang xử lý dữ liệu...</p>
      )}
      {showExerciseContent && (
        <DienKhuyetContent
          state={state}
          checkResult={checkResult}
          goToNextExerciseHandler={goToNextExerciseHandler}
          showRightNoti={showRightNoti}
        />
      )}
      {state.congratulation && (
        <Congratulation
          exerciseData={exerciseData}
          subscriptionInstance={subscriptionInstance}
        />
      )}
    </>
  );
}

const DienKhuyetContent = ({
  state,
  checkResult,
  goToNextExerciseHandler,
  showRightNoti,
}) => {
  return (
    <div id="1">
      <AutoResizeTextarea
        inputValue={`Đề bài: ${state.dienKhuyetData.deBai || ""}`}
        ordinalNumber={state.dienKhuyetData.ordinal || ""}
      />
      <hr />
      <ImagePreview url={state.dienKhuyetData.imageUrl} />
      <hr />
      <form
        className="card-homework-student-work-wrapper"
        onSubmit={!state.checked ? checkResult : goToNextExerciseHandler}
      >
        <p className="guide-text">{state.dienKhuyetData.cauHoi}</p>
        {state.dienKhuyetData.noiDungBaiTap}
        {state.checked &&
          (showRightNoti ? (
            <RightAnswerNoti dapAn={state.dapAn} />
          ) : (
            <WrongAnswerNoti dapAn={state.dapAn} />
          ))}
        <button id="2" type="submit" className="btn-shape btn-shape-main mt-10">
          {!state.checked ? "Kiểm tra" : "Câu tiếp theo"}
        </button>
      </form>
    </div>
  );
};
