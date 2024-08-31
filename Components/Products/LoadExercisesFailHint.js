import Link from "next/link";

export default function LoadExercisesFailHint({ loadExercises }) {
  return (
    <p className="text-center my-4 italic text-coGray2">
      Nếu không tải được vui lòng thực hiện một trong hai bước sau: <br />-{" "}
      <button
        type="button"
        onClick={loadExercises}
        className="btn btn-submit !w-fit"
      >
        Bấm vào đây để tải lại
      </button>
      - <br />
      <Link href="/products">Bấm vào đây để trở lại trang chọn bài tập.</Link>
    </p>
  );
}
