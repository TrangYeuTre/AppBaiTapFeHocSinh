import { useState, useEffect } from "react";
import { FaTag } from "react-icons/fa";

export default function ItemPicker({ itemsIn, itemOut }) {
  //Đầu vào itemsIn phải có dạng [{name:"abc",_id:"id", isSelected:boolean}]
  const [items, setItems] = useState([]);

  const pickItemHandler = (id) => {
    const itemsClone = [...items];
    const target = itemsClone.find((per) => per._id === id);
    if (target) {
      if (target.isSelected) {
        itemsClone.forEach((item) => (item.isSelected = false));
      } else {
        itemsClone.forEach((item) => (item.isSelected = false));
        target.isSelected = true;
      }
    }
    setItems(itemsClone);
    itemOut(target);
  };

  useEffect(() => {
    setItems(itemsIn);
  }, [itemsIn]);

  if (!items || items.length === 0) return null;

  return (
    <div>
      <div className="items-picker-wrapper">
        {items.map((item) => (
          <div
            key={item._id}
            onClick={pickItemHandler.bind(null, item._id)}
            className={!item.isSelected ? "item-tag" : "item-tag-active"}
          >
            <FaTag /> {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
