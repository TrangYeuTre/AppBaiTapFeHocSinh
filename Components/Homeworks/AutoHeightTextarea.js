import React, { useEffect } from "react";

export default function AutoResizeTextarea({ inputValue, id, ordinalNumber }) {
  const textareaRef = React.createRef();

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
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
        defaultValue={inputValue}
        className="w-full h-fit resize-none
      border-none font-semibold
     pointer-events-none text-2xl"
      />
    </div>
  );
}
