import { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaBook } from "react-icons/fa";

export default function ItemPicker({
  itemsIn,
  itemOut,
  showSearchItem,
  picked,
}) {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null); // Track selected item ID
  const searchItemsRef = useRef(null);

  const pickItemHandler = useCallback(
    (id) => {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          isSelected: item._id === id ? !item.isSelected : false,
        }))
      );
      const selectedItem = items.find((item) => item._id === id);
      itemOut(selectedItem);
      setSelectedItemId(id); // Set the selected item ID

      // Delay the scroll action to ensure the DOM has updated
      setTimeout(() => {
        const scrollToActionElement = document.getElementById(
          "picked-cate-scroll-to"
        );
        scrollToActionElement?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Adjust the delay as needed
    },
    [items, itemOut]
  );

  const searchItems = useCallback(() => {
    const keyword = searchItemsRef.current?.value.trim().toLowerCase();
    if (!keyword) {
      setItems(itemsIn);
      return;
    }
    const filteredItems = itemsIn.filter((item) =>
      item.name.toLowerCase().includes(keyword)
    );
    setItems(filteredItems.length > 0 ? filteredItems : itemsIn);
    searchItemsRef.current.value = "";
  }, [itemsIn]);

  const scrollToLoadExcerciseButton = useCallback(() => {
    const scrollToActionElement = document.getElementById(
      "picked-cate-scroll-to"
    );
    scrollToActionElement?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (selectedItemId) {
      scrollToLoadExcerciseButton(); // Trigger scroll after state update
    }
  }, [selectedItemId, scrollToLoadExcerciseButton]);

  const fillInSearchInput = useCallback(() => {
    if (!picked?.cate) return;

    const childCate = JSON.parse(localStorage.getItem("childCate"));
    if (childCate?.value && searchItemsRef.current) {
      // Ensure the input element is ready before setting its value
      searchItemsRef.current.value = childCate.value;
    }
  }, [picked]);

  useEffect(() => {
    // Wait for the input element to render before calling fillInSearchInput
    if (searchItemsRef.current) {
      fillInSearchInput();
    }
  }, [fillInSearchInput]);

  useEffect(() => {
    setItems(itemsIn);
  }, [itemsIn]);

  if (!items || items.length === 0) return null;

  return (
    <div>
      {showSearchItem && (
        <div className="w-full mb-2 p-2 rounded-md flex flex-row gap-2 shrink-0">
          <input
            className="w-4/5 border-coGreen border-2 rounded-lg"
            placeholder="Tìm theo tên bài tập..."
            ref={searchItemsRef}
          />
          <button
            type="button"
            className="btn-shape btn-shape-try w-1/5"
            onClick={searchItems}
          >
            <FaSearch /> Tìm
          </button>
        </div>
      )}

      <div className="items-picker-wrapper">
        {items.map((item) => {
          const tagStyle = item.active
            ? item.isSelected
              ? "item-tag-active"
              : "item-tag"
            : "item-tag-disabled";

          return (
            <div
              key={item._id}
              onClick={() => item.active && pickItemHandler(item._id)}
              className={tagStyle}
            >
              <FaBook />
              <p className="pl-2 border-l-2 border-coWhite">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
