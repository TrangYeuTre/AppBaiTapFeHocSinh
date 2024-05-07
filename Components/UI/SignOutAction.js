import { useRouter } from "next/router";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../store/authSlice";

export default function SignOutAction() {
  const router = useRouter();
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(AuthActions.clearAuth());
    router.push("/auth");
  };

  return (
    <button type="button" className="btn btn-submit" onClick={signOutHandler}>
      <FaSignOutAlt /> Đăng xuất
    </button>
  );
}
