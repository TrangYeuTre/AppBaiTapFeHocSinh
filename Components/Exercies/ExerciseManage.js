import Card from "../UI/Card";
import ExerciseItem from "./ExerciseItem";

export default function ExerciseManage({ exercises }) {
  if (!exercises || exercises.length === 0)
    return (
      <Card plusStyle="w-1/2">
        <p>Chưa có bài tập được giao 😎😎😎</p>
      </Card>
    );
  return (
    <section className="content-wrapper">
      <ul className="list-none flex flex-1 flex-col gap-10 mt-8 ">
        {exercises.map((ex) => (
          <ExerciseItem
            key={"Hello" + Math.random().toString()}
            exercise={ex}
          />
        ))}
      </ul>
    </section>
  );
}
