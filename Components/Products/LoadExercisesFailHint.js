import Link from "next/link";
import LocalNotification from "../UI/LocalNotification";

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
    </div>
  );
}
