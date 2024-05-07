import ProgressBar from "./ProgressBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FaStepBackward } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from "react";
import { manipulateWithLocalStorage } from "../../helper/uti";
import { submitAnswers } from "../../helper/axiosApi";
import Image from "next/image";
import Homeworks from "../../classes/Homeworks";
import { useAxiosInstance } from "../../hooks/useHooks";
import SignOutAction from "../UI/SignOutAction";

export default function HomeworkActionsBar({
  doAction1,
  doAction2,
  pulseButton,
  isLoading,
  validSubmit,
  hocSinh,
}) {
  const router = useRouter();

  const [showProgress, setShowProgress] = useState(true);
  const homeworks = useSelector((state) => state.hws.hws);
  const instanceHomeworks = new Homeworks(homeworks);
  const token = useSelector((state) => state.auth.token);
  const axiosInstance = useAxiosInstance(token);

  const [resultMessage, setResultMessage] = useState({
    code: null,
    message: "",
  });

  const submitHomeworksHandler = async () => {
    const statusCode = await submitAnswers({
      hws: instanceHomeworks.homeworks,
      axiosInstance,
      hocSinh,
    });
    if (statusCode === 200 || statusCode === 201) {
      manipulateWithLocalStorage({ order: "clearStudentWorks" });
      setResultMessage({
        code: statusCode,
        message:
          "Nộp bài thành công 🎉🎉🎉. Bé có thể bấm nút kế bên để làm lại nếu còn lượt làm bài.",
      });
    }
    if (statusCode === 500) {
      setResultMessage({
        code: statusCode,
        message:
          "App đang lỗi !!!. Bé hãy bấm nút kế bên để thoát app và thử lại sau nhé.",
      });
    }
  };

  return (
    <section className="homework-actions-wrapper">
      {!resultMessage.code && (
        <div className="homework-actions-container-big">
          <div className="col-span-1 flex flex-row gap-2 flex-wrap justify-center items-center">
            {showProgress && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setShowProgress(false);
                }}
              >
                <IoSettingsSharp />
              </button>
            )}
            {!showProgress && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setShowProgress(true);
                }}
              >
                <FaStepBackward />
              </button>
            )}
          </div>
          {showProgress && (
            <div className="col-span-7 flex flex-col gap-2 justify-center items-center px-10">
              <ProgressBar />
            </div>
          )}
          {showProgress && (
            <div className="col-span-2 flex flex-row gap-2 justify-center items-center">
              {!validSubmit && (
                <button
                  type="button"
                  onClick={() => {
                    doAction1();
                  }}
                  className={`btn btn-main  !mx-0 ${
                    pulseButton ? "animate-pulse" : null
                  }`}
                >
                  {isLoading ? "Đang cập nhật..." : "Tiếp theo →"}
                </button>
              )}
              {validSubmit && (
                <button
                  onClick={submitHomeworksHandler}
                  className="btn btn-submit  !mx-0 animate-pulse"
                >
                  <div className="hidden lg:block">
                    <Image
                      alt="car-running"
                      src="/assets/car-run.gif"
                      width={80}
                      height={40}
                    />
                  </div>
                  Nộp bài
                </button>
              )}
            </div>
          )}
          {!showProgress && (
            <div className="col-span-9 flex flex-row gap-3 justify-center items-center p-4">
              <button
                type="button"
                className="btn btn-main"
                onClick={() => {
                  router.push("/exercises");
                }}
              >
                Xem bài sửa
              </button>
              <SignOutAction />
            </div>
          )}
        </div>
      )}
      {!resultMessage.code && (
        <div className="homework-actions-container-small">
          {showProgress && <ProgressBar />}
          {showProgress && (
            <button
              type="button"
              onClick={() => {
                doAction1();
              }}
              className={`btn btn-main  ${
                pulseButton ? "animate-pulse" : null
              }`}
            >
              Tiếp theo →
            </button>
          )}
          {showProgress && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setShowProgress(false);
              }}
            >
              <IoSettingsSharp />
            </button>
          )}
          {!showProgress && (
            <div className="flex flex-col gap-2 p-3">
              <button
                type="button"
                className="btn btn-main"
                onClick={() => {
                  router.push("/exercises");
                }}
              >
                Xem bài sửa
              </button>
              <SignOutAction />
            </div>
          )}
          {!showProgress && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setShowProgress(true);
              }}
            >
              <FaStepBackward />
            </button>
          )}

          {/* <button className="btn btn-submit !w-fit !mx-0">Nộp bài</button> */}
        </div>
      )}
      {resultMessage.code && (
        <div className="homework-actions-result">
          <p>{resultMessage.message}</p>
          {(resultMessage.code === 200 || resultMessage.code === 201) && (
            <button
              className="btn btn-main !w-fit !mx-0"
              onClick={() => {
                router.reload();
              }}
            >
              Tải lại
            </button>
          )}
          {resultMessage.code === 500 && <SignOutAction />}
        </div>
      )}
    </section>
  );
}
