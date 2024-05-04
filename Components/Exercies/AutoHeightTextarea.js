import React, { useEffect } from "react";

export default function AutoResizeTextarea({ inputValue, id }) {
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
  }, [inputValue]);

  return (
    <textarea
      id={id ? id : null}
      ref={textareaRef}
      defaultValue={inputValue}
      className="w-full h-auto resize-none
     p-2 bg-coGray5 border-none font-semibold
     pointer-events-none"
    />
  );
}
