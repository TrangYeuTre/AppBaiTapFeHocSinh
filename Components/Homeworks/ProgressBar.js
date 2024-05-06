import { useLoadHomework } from "../../hooks/useHooks";
import Image from "next/image";

export default function ProgressBar({ plusStyle }) {
  const { homeworkOrdinal, totalHomeworks } = useLoadHomework();
  const percentage = ((homeworkOrdinal - 1) / totalHomeworks) * 100;

  return (
    <div className={`progress-bar-wrapper ${plusStyle}`}>
      <div
        className="progress-bar-loading"
        id="progress-bar-loading"
        style={{ width: `${percentage}%` }}
      />
      <div className="relative bottom-4 right-5 hidden lg:block">
        <Image
          alt="car-running"
          src="/assets/car-run.gif"
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}
