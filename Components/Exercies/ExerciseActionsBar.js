import { useRouter } from "next/router";
import SignOutAction from "../UI/SignOutAction";

export default function ExerciseActionsBar({ isLoading, validSubmit }) {
  const router = useRouter();

  const backToHomework = () => {
    router.replace("/homeworks");
  };

  return (
    <section className="homework-actions-wrapper">
      {" "}
      <div className="col-span-9 flex flex-row gap-3 justify-center items-center p-4">
        <button type="button" className="btn btn-main" onClick={backToHomework}>
          Trở lại
        </button>
        <SignOutAction />
      </div>
    </section>
  );
}
