import ClassifyDienKhuyet from "./Classify_DienKhuyet";
import ClassisfyTracNghiem from "./Classify_TracNghiem";

export default function ClassifyExercises({
  exerciseData,
  goToNextExercise,
  subscriptionInstance,
}) {
  const { phanLoai } = exerciseData;

  console.log(exerciseData);

  if (phanLoai === "dienKhuyet")
    return (
      <ClassifyDienKhuyet
        exerciseData={exerciseData}
        goToNextExercise={goToNextExercise}
        subscriptionInstance={subscriptionInstance}
      />
    );
  if (phanLoai === "tracNghiem")
    return (
      <ClassisfyTracNghiem
        exerciseData={exerciseData}
        goToNextExercise={goToNextExercise}
        subscriptionInstance={subscriptionInstance}
      />
    );
  return <p>Phân loại bài tập</p>;
}
