import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

export default function ModalYoutube({ children, onCloseModal }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const enableScroll = () => {
      document.body.style.overflow = "auto";
    };

    // Disable scroll when modal opens
    disableScroll();

    return () => {
      // Enable scroll when modal closes
      enableScroll();
    };
  }, []);

  if (!isClient) {
    return null; // Ensure modal renders only on the client
  }

  const modalElement = document.getElementById("my-overlay");

  return modalElement
    ? ReactDOM.createPortal(
        <section className="bg-coGray5 text-coWhite fixed z-50 top-0 left-0 w-full h-full">
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
      )
    : null;
}
