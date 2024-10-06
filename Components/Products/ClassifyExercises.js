import ClassifyDienKhuyet from "./Classify_DienKhuyet";
import ClassisfyTracNghiem from "./Classify_TracNghiem";

export default function ClassifyExercises({
  exerciseData,
  goToNextExercise,
  subscriptionInstance,
}) {
  const { phanLoai="" } = exerciseData;

  switch (phanLoai) {
    case "dienKhuyet":
      return (
        <ClassifyDienKhuyet
          exerciseData={exerciseData}
          goToNextExercise={goToNextExercise}
          subscriptionInstance={subscriptionInstance}
        />
      );
    case "tracNghiem":
      return (
        <ClassisfyTracNghiem
          exerciseData={exerciseData}
          goToNextExercise={goToNextExercise}
          subscriptionInstance={subscriptionInstance}
        />
      );
    default:
      return <p>Không tìm thấy phân loại bài tập phù hợp</p>;
  }
}
