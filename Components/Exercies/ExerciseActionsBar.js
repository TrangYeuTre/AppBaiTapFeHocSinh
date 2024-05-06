import { useRouter } from "next/router";
import { AuthActions } from "../../store/authSlice";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function ExerciseActionsBar({ isLoading, validSubmit }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(AuthActions.clearAuth());
    router.push("/auth");
  };

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
        <button
          type="button"
          className="btn btn-submit"
          onClick={signOutHandler}
        >
          <FaSignOutAlt /> Đăng xuất
        </button>
      </div>
    </section>
  );
}
