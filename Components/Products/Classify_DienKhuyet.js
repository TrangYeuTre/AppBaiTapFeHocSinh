import { DienKhuyetExercise } from "../../classes/ClassifyExercise";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { scrollToElementId, devErrorMessage } from "../../helper/uti";
import AutoResizeTextarea from "../Homeworks/AutoHeightTextarea";
import ImagePreview from "../UI/ImagePreview";
import Congratulation from "./General/Congratulation";
import RightAnswerNoti from "./General/RightAnswerNoti";
import WrongAnswerNoti from "./General/WrongAnswerNoti";

export default function ClassifyDienKhuyet({
  exerciseData,
  goToNextExercise,
  subscriptionInstance,
}) {
  const [initLoadData, setInitLoadData] = useState(false);
  const [dienKhuyetData, setDienKhuyetData] = useState();
  const [checked, setChecked] = useState(false);
  const [dapAn, setDapAn] = useState({ result: null, message: "" });
  const [congratulation, setCongratulation] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    //1. Xử lý tạo data render
    createInitData();
  }, [exerciseData]);

  useEffect(() => {
    scrollToElementId("#1");
    //2. Xong hết thì focus vào input cho tiện điền giá trị
    if (dienKhuyetData) {
      dienKhuyetData.initClearAndFocusInput(
        `input-dk-${dienKhuyetData.inputId}`
      );
    }
  }, [dienKhuyetData]);

  const createInitData = async () => {
    setInitLoadData(true);
    try {
      const dkData = new DienKhuyetExercise({
        ...exerciseData,
        cauHoi: "Bé hãy điền đáp án vào chỗ trống.",
      });

      await dkData.initLoadImage();
      setDienKhuyetData(dkData);
    } catch (err) {
      devErrorMessage({
        err,
        from: "/Components/Products/Classify_DienKhuyet.js",
      });
    } finally {
      setInitLoadData(false);
    }
  };

  const checkResult = (e) => {
    e.preventDefault();
    setChecked(true);
    const da = dienKhuyetData.getResult();
    if (da.result) {
      dispatch(SubscriptionAuthActions.countRightAnswer());
      dispatch(SubscriptionAuthActions.saveRightAnswer(dienKhuyetData._id));
    } else {
      dispatch(SubscriptionAuthActions.saveWrongAnswer(dienKhuyetData._id));
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
    !congratulation && !initLoadData && dienKhuyetData;

  console.log(dienKhuyetData)

  return (
    <>
      {/* {showInitLoadData && <Loading />} */}
      {showInitLoadData && (
        <p className="text-coGreen text-center italic">Đang xử lý dữ liệu...</p>
      )}
      {showExerciseContent && (
        <div id="#1">
          <AutoResizeTextarea
            inputValue={`Đề bài: ${dienKhuyetData.deBai || null}`}
            ordinalNumber={dienKhuyetData.ordinal || ""}
          />

          <hr />
          <ImagePreview url={dienKhuyetData.imageUrl} />
          <hr />
          <form
            className="card-homework-student-work-wrapper"
            onSubmit={!checked ? checkResult : goToNextExerciseHandler}
          >
            <p className="guide-text">{dienKhuyetData.cauHoi}</p>
            {dienKhuyetData.noiDungBaiTap}
            {checked && showRightNoti && <RightAnswerNoti dapAn={dapAn} />}

            {checked && !showRightNoti && <WrongAnswerNoti dapAn={dapAn} />}

            <button
              id="#2"
              type="submit"
              className="btn-shape btn-shape-main mt-10"
            >
              {!checked ? "Kiểm tra" : "Câu tiếp theo"}
            </button>
          </form>
        </div>
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
