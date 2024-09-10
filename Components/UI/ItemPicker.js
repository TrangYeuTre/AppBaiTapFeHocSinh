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

  console.log(items);

  return (
    <div>
      <div className="items-picker-wrapper">
        {items.map((item) => {
          let tagStyle = "item-tag";
          if (item.active) {
            if (item.isSelected) tagStyle = "item-tag-active";
          } else {
            tagStyle = "item-tag-disabled";
          }
          return (
            <div
              key={item._id}
              onClick={
                item.active
                  ? pickItemHandler.bind(null, item._id)
                  : () => {
                      return null;
                    }
              }
              className={tagStyle}
            >
              <FaTag /> {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
