import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";

export default function Modal({ children }) {
  const dispatch = useDispatch();
  const modalElement = document.getElementById("my-overlay");
  return ReactDOM.createPortal(
    <section
      onClick={() => {
        dispatch(HwsActions.stopUpdatingStore());
      }}
      className="bg-coGray3 text-coWhite fixed z-50 top-0 lef-0 w-full h-screen opacity-90"
    >
      <div
        className="flex flex-row flex-1 justify-center items-center
       border-4 border-coWhite rounded-xl p-4 w-2/3 mx-auto relative top-20"
      >
        {children}
      </div>
    </section>,
    modalElement
  );
}
