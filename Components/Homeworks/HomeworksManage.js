import { useLoadHomework } from "../../hooks/useHooks";
import HomeworkType from "./HomeworkType";
import CardHomework from "../UI/CardHomework";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AuthActions } from "../../store/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

export default function HomeworksManage({ hocSinh }) {
  const { homeworkData, validSubmit } = useLoadHomework();
  const router = useRouter();
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(AuthActions.clearAuth());
    router.push("/auth");
  };

  const backToExercises = () => {
    router.replace("/exercises");
  };

  if (Object.keys(homeworkData).length === 0)
    return (
      <CardHomework>
        <div className="flex flex-col flex-1 gap-6 p-6 justify-center items-center">
          <h1>Không có bài tập được giáo 👀 👀 👀</h1>
          <button
            type="button"
            className="btn btn-main"
            onClick={backToExercises}
          >
            Xem bài sửa.
          </button>
          <button
            type="button"
            className="btn btn-submit"
            onClick={signOutHandler}
          >
            <FaSignOutAlt /> Đăng xuất
          </button>
        </div>
      </CardHomework>
    );

  return (
    <HomeworkType
      homeworkData={homeworkData}
      validSubmit={validSubmit}
      hocSinh={hocSinh}
    />
  );
}
