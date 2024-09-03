import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { SubscriptionAuthActions } from "../../../store/subscriptionSlice";

export default function BottomMenu({ navigations }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const signOutHandler = () => dispatch(SubscriptionAuthActions.clearAuth());
  //   const goToArchivement = () => router.replace("/subscription/archivements");
  //   const goToReDo = () => {};
  return (
    <section
      className="p-8 border-t-4
    border-coGray2 absolute bottom-0 left-0
    w-full"
    >
      <div
        className="flex flex-row flex-wrap 
    justify-center gap-2"
      >
        {navigations &&
          navigations.map((item) => (
            <button
              id={item.name}
              className="btn-shape btn-shape-main w-fit"
              onClick={() => {
                router.replace(item.route);
              }}
            >
              {item.name}
            </button>
          ))}
        <button
          className="btn-shape btn-shape-ghost w-fit"
          type="button"
          onClick={signOutHandler}
        >
          Đăng xuất
        </button>
      </div>
    </section>
  );
}
