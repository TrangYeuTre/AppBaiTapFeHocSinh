import { useLoadHomework } from "../../hooks/useHooks";
import HomeworkType from "./HomeworkType";
import CardHomework from "../UI/CardHomework";
import { useRouter } from "next/router";
import SignOutAction from "../UI/SignOutAction";

export default function HomeworksManage({ hocSinh }) {
  const { homeworkData, validSubmit } = useLoadHomework();

  const router = useRouter();

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
          <SignOutAction />
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
