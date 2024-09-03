import AutoResizeTextarea from "../Homeworks/AutoHeightTextarea";
import { DienKhuyetExercise } from "../../classes/ClassifyExercise";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "../UI/Loading";
import { useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import Congratulation from "./General/Congratulation";

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
      console.log(err);
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
    } else {
      dispatch(SubscriptionAuthActions.saveWrongAnswer(dienKhuyetData._id));
    }
    setDapAn((preState) => {
      return { ...preState, ...da };
    });
  };

  const goToNextExerciseHandler = (e) => {
    e.preventDefault();
    //1. Check xem index bài tập đang load nếu là 10 rồi thì tới trang chúc mừng
    const currentExerciseIndex = subscriptionInstance.getCurrentExerciseIndex();
    if (+currentExerciseIndex === 9) {
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

  return (
    <>
      {showInitLoadData && <Loading />}
      {showExerciseContent && (
        <>
          <AutoResizeTextarea
            inputValue={`Đề bài: ${dienKhuyetData.deBai || null}`}
            ordinalNumber={dienKhuyetData.ordinal || ""}
          />

          <hr className="line-gray" />
          <ImagePreview url={dienKhuyetData.imageUrl} />
          <hr className="line-gray" />
          <form
            className="card-homework-student-work-wrapper"
            onSubmit={!checked ? checkResult : goToNextExerciseHandler}
          >
            <p className="guide-text">{dienKhuyetData.cauHoi}</p>
            {dienKhuyetData.noiDungBaiTap}
            {checked && showRightNoti && (
              <div
                className="p-3 bg-coGreen2 flex flex-row flex-wrap 
        gap-4 items-center justify-center"
              >
                <Image
                  src="/assets/happy.gif"
                  alt="Trả lời đúng"
                  width={60}
                  height={60}
                />
                <p className="uppercase text-2xl font-semibold text-coGreen">
                  {dapAn.message}
                </p>
              </div>
            )}

            {checked && !showRightNoti && (
              <div
                className="p-3 bg-coRed2 flex flex-row flex-wrap 
        gap-4 items-center justify-center"
              >
                <Image
                  src="/assets/sad.gif"
                  alt="Trả lời đúng"
                  width={50}
                  height={50}
                />
                <p className="uppercase text-2xl font-semibold text-coRed">
                  Không chính xác. Đáp án là:{" "}
                  <span className="text-coYellow">{dapAn.message}</span>
                </p>
              </div>
            )}

            <button type="submit" className="btn-shape btn-shape-main mt-10">
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
    </>
  );
}
