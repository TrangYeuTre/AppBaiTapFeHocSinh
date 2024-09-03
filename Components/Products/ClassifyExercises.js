import ClassifyDienKhuyet from "./Classify_DienKhuyet";

export default function ClassifyExercises({
  exerciseData,
  goToNextExercise,
  subscriptionInstance,
}) {
  const { phanLoai } = exerciseData;
  if (phanLoai === "dienKhuyet")
    return (
      <ClassifyDienKhuyet
        exerciseData={exerciseData}
        goToNextExercise={goToNextExercise}
        subscriptionInstance={subscriptionInstance}
      />
    );
  return <p>Phân loại bài tập</p>;
}
