import LocalNotification from "../UI/LocalNotification";
import Link from "next/link";

export default function LoadExercisesFailHint({ loadExercises, localNoti }) {
  return (
    <div className="p-6">
      <LocalNotification localNoti={localNoti} />
      <button
        type="button"
        onClick={loadExercises}
        className="btn-shape btn-shape-submit !w-fit"
      >
        Bấm vào đây để tải lại
      </button>
      <Link href="/products">Bấm vào đây để trở lại trang chọn bài tập.</Link>
    </div>
  );
}
