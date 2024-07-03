import React, { useEffect, useRef } from "react";

export default function AutoResizeTextarea({ inputValue, id, ordinalNumber }) {
  const textareaRef = useRef(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Đặt chiều cao của textarea thành auto để có thể đo kích thước tự động
      textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao mới cho textarea dựa trên scrollHeight
    }
  };

  useEffect(() => {
    textareaRef.current.value = inputValue;
    autoResize();
  }, [inputValue, id]);

  return (
    <div className="p-4">
      <div className="myTag myTag2Light mb-2 opacity-40">
        <h3>{`Bài tập số: ${ordinalNumber || null}`}</h3>
      </div>

      <textarea
        id={id ? id : null}
        ref={textareaRef}
        className="w-full h-fit resize-none border-none
         font-semibold p-4 rounded-xl m-0 bg-coYellow
         pointer-events-none
        text-base lg:max-2xl:text-2xl 2xl:text-3xl dan-dong-textarea"
        onInput={autoResize} // Gọi hàm autoResize khi có sự kiện input
      />
    </div>
  );
}
