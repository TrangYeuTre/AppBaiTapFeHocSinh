import { useLoadHomework } from "../../hooks/useHooks";

export default function ProgressBar() {
  const { homeworkOrdinal, totalHomeworks } = useLoadHomework();
  console.log(homeworkOrdinal, totalHomeworks);
  const percentage = ((homeworkOrdinal - 1) / totalHomeworks) * 100;
  console.log(percentage);
  return (
    // <section className="content-wrapper">
    <div className="progress-bar-wrapper">
      <div
        className="progress-bar-loading"
        style={{ width: `${percentage}%` }}
      />
    </div>
    // </section>
  );
}
