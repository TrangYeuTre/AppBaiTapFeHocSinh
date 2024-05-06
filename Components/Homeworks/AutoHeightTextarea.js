import React, { useEffect } from "react";

export default function AutoResizeTextarea({ inputValue, id, ordinalNumber }) {
  const textareaRef = React.createRef();
  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Đặt chiều cao của textarea thành auto để có thể đo kích thước tự động
      const computedHeight = window
        .getComputedStyle(textarea)
        .getPropertyValue("height"); // Lấy giá trị chiều cao tính toán từ CSS
      textarea.style.height = computedHeight; // Đặt chiều cao mới cho textarea
    }
  };

  useEffect(() => {
    autoResize();
    textareaRef.current.value = inputValue;
  }, [inputValue, id]);

  return (
    <div className="p-4">
      <div className="myTag myTag2Light mb-2 opacity-40">
        <h3>{`Bài tập số: ${ordinalNumber || null}`}</h3>
      </div>

      <textarea
        id={id ? id : null}
        ref={textareaRef}
        // defaultValue={inputValue}
        className="w-full h-fit resize-none border-none
         font-semibold p-0 m-0
         pointer-events-none
        text-base lg:max-2xl:text-xl 2xl:text-2xl"
      />
    </div>
  );
}
