import ProgressBar from "./ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AuthActions } from "../../store/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

export default function HomeworkActionsBar({
  doAction1,
  doAction2,
  bounceButton,
}) {
  console.log(bounceButton);
  const dispatch = useDispatch();
  const router = useRouter();

  const signOutHandler = () => {
    dispatch(AuthActions.clearAuth());
    router.push("/auth");
  };
  return (
    <section
      className="fixed bottom-0 left-0 w-full bg-coWhite
    border-t-2 border-coGray4 max-h-[160px] p-6"
    >
      <div className="grid grid-cols-10 h-fit">
        <div className="col-span-1 flex flex-row gap-2 flex-wrap justify-center items-center">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={signOutHandler}
          >
            <FaSignOutAlt /> Đăng xuất
          </button>
        </div>
        <div className="col-span-7 flex flex-col gap-2 justify-center items-center px-10">
          <ProgressBar />
        </div>
        <div className="col-span-2 flex flex-row gap-2 justify-center items-center">
          <button
            type="button"
            onClick={() => {
              doAction1();
            }}
            className={`btn btn-main !w-fit !mx-0 ${
              bounceButton ? "animate-bounce" : null
            }`}
          >
            Xác nhận
          </button>
          {/* <button className="btn btn-submit !w-fit !mx-0">Nộp bài</button> */}
        </div>
      </div>
    </section>
  );
}
