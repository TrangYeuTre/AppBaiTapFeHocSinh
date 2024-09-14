import { TracNghiemExercise } from "../../classes/ClassifyExercise";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useLocalNotification } from "../../hooks/useHooks";
import LocalNotification from "../UI/LocalNotification";
import AutoResizeTextarea from "../Homeworks/AutoHeightTextarea";
import ImagePreview from "../UI/ImagePreview";
import Congratulation from "./General/Congratulation";
import RightAnswerNoti from "./General/RightAnswerNoti";
import WrongAnswerNoti from "./General/WrongAnswerNoti";
import { scrollToElementId } from "../../helper/uti";

export default function ClassifyTracNghiem({
  exerciseData,
  goToNextExercise,
  subscriptionInstance,
}) {
  const [initLoadData, setInitLoadData] = useState(false);
  const [tracNghiemData, setTracNghiemData] = useState();
  const [checked, setChecked] = useState(false);
  const [dapAn, setDapAn] = useState({ result: null, message: "" });
  const [congratulation, setCongratulation] = useState(false);
  const [options, setOptions] = useState([]);
  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();

  const dispatch = useDispatch();

  useEffect(() => {
    //1. Xử lý tạo data render
    createInitData();
  }, [exerciseData]);

  const createInitData = async () => {
    setInitLoadData(true);
    try {
      const tnData = new TracNghiemExercise({
        ...exerciseData,
      });

      await tnData.initLoadImage();
      setTracNghiemData(tnData);
      setOptions(tnData.getOptions());
    } catch (err) {
      console.log(err);
    } finally {
      setInitLoadData(false);
      scrollToElementId("#1");
    }
  };

  const chooseAnswer = (id) => {
    if (options.length === 0) return;
    clearLocalNotification();
    setOptions((preState) => {
      const clone = [...preState];
      clone.forEach((item) => (item.isSelected = false));
      const target = clone.find((item) => item.id === id);
      if (target) target.isSelected = true;
      return clone;
    });
  };

  const checkResult = (e) => {
    e.preventDefault();
    const choosenOpt = options.find((opt) => opt.isSelected);
    if (!choosenOpt) {
      doSetLocalNotification({
        status: 401,
        message: "Phải chọn một câu trả lời.",
      });
      return;
    }

    setChecked(true);

    const da = tracNghiemData.getResult(choosenOpt.id);
    if (da.result) {
      dispatch(SubscriptionAuthActions.countRightAnswer());
      dispatch(SubscriptionAuthActions.saveRightAnswer(tracNghiemData._id));
    } else {
      dispatch(SubscriptionAuthActions.saveWrongAnswer(tracNghiemData._id));
    }
    setDapAn((preState) => {
      return { ...preState, ...da };
    });
    scrollToElementId("#2");
  };

  const goToNextExerciseHandler = (e) => {
    e.preventDefault();
    //1. Check xem index bài tập đang load nếu là 10 rồi thì tới trang chúc mừng
    const currentExerciseIndex = subscriptionInstance.getCurrentExerciseIndex();
    if (
      +currentExerciseIndex ===
      subscriptionInstance.getExercisesLength() - 1
    ) {
      setCongratulation(true);
      return;
    }
    //Reset các state trước
    setChecked(false);
    setDapAn({ result: null, message: "" });
    goToNextExercise();
  };

  const showRightNoti = dapAn.result && dapAn.message;
  const showInitLoadData = !congratulation && initLoadData;
  const showExerciseContent =
    !congratulation && !initLoadData && tracNghiemData;

  return (
    <div id="#1">
      {showInitLoadData && (
        <p className="text-coGreen text-center italic">Đang xử lý dữ liệu...</p>
      )}
      {showExerciseContent && (
        <>
          <AutoResizeTextarea
            inputValue={`Đề bài: ${tracNghiemData.deBai || null}`}
            ordinalNumber={tracNghiemData.ordinal || ""}
          />

          <hr />
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
                  onClick={chooseAnswer.bind(this, opt.id)}
                >
                  {opt.content}
                </li>
              ))}
            </ul>
            {checked && showRightNoti && <RightAnswerNoti dapAn={dapAn} />}

            {checked && !showRightNoti && <WrongAnswerNoti dapAn={dapAn} />}

            <LocalNotification localNoti={localNoti} />

            <button
              id="#2"
              type="submit"
              className="btn-shape btn-shape-main mt-10"
            >
              {!checked ? "Kiểm tra" : "Câu tiếp theo"}
            </button>
          </form>
        </>
      )}
      {congratulation && (
        <Congratulation
          exerciseData={exerciseData}
          subscriptionInstance={subscriptionInstance}
        />
      )}
    </div>
  );
}
