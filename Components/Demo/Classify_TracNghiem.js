import LocalNotification from "../UI/LocalNotification";
import ImagePreview from "../UI/ImagePreview";
import AutoResizeTextarea from "../Homeworks/AutoHeightTextarea";
import Congratulation from "./General/Congratulation";
import RightAnswerNoti from "../Products/General/RightAnswerNoti";
import WrongAnswerNoti from "../Products/General/WrongAnswerNoti";
import { TracNghiemExercise } from "../../classes/ClassifyExercise";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { scrollToElementId, devErrorMessage } from "../../helper/uti";
import { useLocalNotification } from "../../hooks/useHooks";
import VideoVertical from "../UI/VideoVertical";
import ModalYoutube from "../modal/ModalYoutube";

export default function ClassifyTracNghiem({
  exerciseData,
  goToNextExercise,
  subscriptionInstance,
}) {
  //Dùng 1 state chung quản lý
  const [state, setState] = useState({
    initLoadData: false,
    tracNghiemData: null,
    checked: false,
    dapAn: { result: null, message: "" },
    congratulation: false,
    options: [],
    videoYoutubeId: "",
    showVideoYoutube: false,
  });

  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    createInitData();
    scrollToElementId("#1");
  }, [exerciseData]);

  const createInitData = useCallback(async () => {
    setState((prev) => ({ ...prev, initLoadData: true }));
    try {
      const tnData = new TracNghiemExercise({ ...exerciseData });
      const videoYoutubeId = tnData.getVideoYoutubeId();
      await tnData.initLoadImage();
      setState((prev) => ({
        ...prev,
        tracNghiemData: tnData,
        options: tnData.getOptions(),
        initLoadData: false,
        videoYoutubeId,
      }));
    } catch (err) {
      devErrorMessage({ err, from: "/Components/Demo/Classify_TracNghiem.js" });
      setState((prev) => ({ ...prev, initLoadData: false }));
    }
  }, [exerciseData]);

  const chooseAnswer = useCallback(
    (id) => {
      scrollToElementId("#2");
      if (state.options.length === 0) return;
      clearLocalNotification();
      setState((prev) => ({
        ...prev,
        options: prev.options.map((item) => ({
          ...item,
          isSelected: item.id === id,
        })),
      }));
    },
    [state.options, clearLocalNotification]
  );

  const checkResult = useCallback(
    (e) => {
      scrollToElementId("#2");
      e.preventDefault();
      const choosenOpt = state.options.find((opt) => opt.isSelected);
      if (!choosenOpt) {
        doSetLocalNotification({
          status: 401,
          message: "Phải chọn một câu trả lời.",
        });
        return;
      }

      const da = state.tracNghiemData.getResult(choosenOpt.id);
      if (da.result) {
        dispatch(SubscriptionAuthActions.countRightAnswer());
        dispatch(
          SubscriptionAuthActions.saveRightAnswer(state.tracNghiemData._id)
        );
      } else {
        dispatch(
          SubscriptionAuthActions.saveWrongAnswer(state.tracNghiemData._id)
        );
      }

      setState((prev) => ({
        ...prev,
        dapAn: { ...prev.dapAn, ...da },
        checked: true,
      }));
      scrollToElementId("#2");
    },
    [state.tracNghiemData, state.options, dispatch, doSetLocalNotification]
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
        setState((prev) => ({ ...prev, congratulation: true }));
      } else {
        setState((prev) => ({
          ...prev,
          checked: false,
          dapAn: { result: null, message: "" },
        }));
        goToNextExercise();
      }
    },
    [subscriptionInstance, goToNextExercise]
  );

  const toggleShowHideVideoYoutube = (action) => {
    setState((prev) => ({
      ...prev,
      showVideoYoutube: action === "show" ? true : false,
    }));
  };

  const {
    initLoadData,
    tracNghiemData,
    checked,
    dapAn,
    congratulation,
    options,
    videoYoutubeId,
    showVideoYoutube,
  } = state;
  const showInitLoadData = !congratulation && initLoadData;
  const showExerciseContent =
    !congratulation && !initLoadData && tracNghiemData;

  return (
    <>
      {showInitLoadData && (
        <p className="text-coGreen text-center italic">Đang xử lý dữ liệu...</p>
      )}
      {showExerciseContent && (
        <TracNghiemContent
          tracNghiemData={tracNghiemData}
          checkResult={checkResult}
          goToNextExerciseHandler={goToNextExerciseHandler}
          options={options}
          checked={checked}
          dapAn={dapAn}
          localNoti={localNoti}
          chooseAnswer={chooseAnswer}
          videoYoutubeId={videoYoutubeId}
          showVideoYoutube={showVideoYoutube}
          toggleShowHideVideoYoutube={toggleShowHideVideoYoutube}
        />
      )}
      {congratulation && (
        <Congratulation
          exerciseData={exerciseData}
          subscriptionInstance={subscriptionInstance}
        />
      )}
    </>
  );
}

const TracNghiemContent = ({
  tracNghiemData,
  checkResult,
  goToNextExerciseHandler,
  options,
  checked,
  dapAn,
  localNoti,
  chooseAnswer,
  toggleShowHideVideoYoutube,
  showVideoYoutube,
  videoYoutubeId,
}) => {
  return (
    <div id="#1">
      <AutoResizeTextarea
        inputValue={`Đề bài: ${tracNghiemData.deBai || null}`}
        ordinalNumber={tracNghiemData.ordinal || ""}
      />
      <hr />
      {videoYoutubeId && (
        <>
          <button
            type="button"
            className="btn-shape btn-shape-video !my-4"
            onClick={toggleShowHideVideoYoutube.bind(this, "show")}
          >
            🖥️ Video hỗ trợ
          </button>
          {showVideoYoutube && (
            <ModalYoutube
              onCloseModal={toggleShowHideVideoYoutube.bind(this, "hide")}
            >
              <VideoVertical
                videoYoutubeId={videoYoutubeId}
                // startAt={0}
                onCloseModal={toggleShowHideVideoYoutube.bind(this, "hide")}
              />
            </ModalYoutube>
          )}
          <hr />
        </>
      )}

      {tracNghiemData.imageUrl && (
        <ImagePreview url={tracNghiemData.imageUrl} />
      )}
      <hr />
      <form
        className="card-homework-student-work-wrapper"
        onSubmit={!checked ? checkResult : goToNextExerciseHandler}
      >
        <p className="guide-text">{tracNghiemData.cauHoi}</p>
        <ul className="classify-trac-ngiem-options-wrapper">
          {options.map((opt) => (
            <li
              key={opt.id}
              className={`btn-shape classify-trac-ngiem-option !min-w-10 lg:!min-w-16 ${
                opt.isSelected ? "btn-shape-main-active" : "btn-shape-ghost"
              }`}
              onClick={() => chooseAnswer(opt.id)}
            >
              {opt.content}
            </li>
          ))}
        </ul>
        {checked &&
          (dapAn.result ? (
            <RightAnswerNoti dapAn={dapAn} />
          ) : (
            <WrongAnswerNoti dapAn={dapAn} />
          ))}
        <LocalNotification localNoti={localNoti} />
        <button
          id="#2"
          type="submit"
          className="btn-shape btn-shape-main mt-10"
        >
          {!checked ? "Kiểm tra" : "Câu tiếp theo"}
        </button>
      </form>
    </div>
  );
};
