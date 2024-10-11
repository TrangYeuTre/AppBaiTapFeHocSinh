import ReactDOM from "react-dom";
import { useEffect } from "react";

export default function ModalYoutube({ children, onCloseModal }) {
  // Chặn scroll body khi modal mở
  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  // Khôi phục scroll body khi modal đóng
  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  // Gọi disableScroll khi modal mở
  useEffect(() => {
    disableScroll();
    return () => {
      enableScroll();
    };
  }, []);
  const modalElement = document.getElementById("my-overlay");
  return ReactDOM.createPortal(
    <section className="bg-coGray5 text-coWhite fixed z-50 top-0 lef-0 w-full h-auto">
      <div className="flex flex-col flex-1 items-center justify-center relative">
        <button
          type="button"
          className="btn-shape btn-shape-ghost !w-fit absolute top-2 right-2 z-20"
          onClick={onCloseModal}
        >
          Đóng
        </button>
        <div className="w-11/12">{children}</div>
      </div>
    </section>,
    modalElement
  );
}
