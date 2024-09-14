import { useRouter } from "next/router";

export default function QuitExerciseBar({ isDemo }) {
  //QUAN TRỌNG: thẻ bọc thằng này phải set relative trong css
  const router = useRouter();
  const quitExercisePackage = () => {
    isDemo ? router.replace("/demo") : router.replace("/products");
  };

  return (
    <div className="exit-exercise-wrapper">
      <button
        type="button"
        onClick={quitExercisePackage}
        className="btn btn-ghost !flex-1 !h-full"
      >
        x
      </button>
    </div>
  );
}
