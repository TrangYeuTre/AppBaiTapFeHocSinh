import Card from "../UI/Card";
import CardHomework from "../UI/CardHomework";
import LoadImageFailMessage from "../UI/LoadImageFailMessage";
import BlockContentBar from "../UI/BlockContentBar";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";
import Image from "next/image";
import HomeworkActionsBar from "./HomeworkActionsBar";

export default function HomeworkTypeMatching({ homeworkData }) {
  const { renderDatas } = homeworkData;
  console.log(renderDatas);

  const [studentDo, setStudentDo] = useState(false);
  const [itemsTrai, setItemsTrai] = useState([]);
  const [itemsPhai, setItemsPhai] = useState([]);

  useEffect(() => {
    setItemsTrai(renderDatas.itemsTrai);
    setItemsPhai(renderDatas.itemsPhaiRandom);
  }, [renderDatas]);

  //Kiểm tra làm đủ thì kích hoạt nút nhảy
  useEffect(() => {
    const totalItemsTrai = itemsTrai.length;
    let countSelected = 0;
    itemsTrai.forEach((item) => {
      item.options.forEach((option) => {
        if (option.isSelected) countSelected++;
      });
    });
    if (totalItemsTrai === countSelected) {
      setStudentDo(true);
    } else {
      setStudentDo(false);
    }
  }, [itemsTrai]);

  console.log(itemsTrai);

  //TODO: update lên store hws đây
  const layDapAnCuaHocSinh = ({ idVeTrai, nhanChon, veTrai }) => {
    //1.Update chọn nội bộ trước
    setItemsTrai((preState) => {
      const cloneItemsTrai = JSON.parse(JSON.stringify([...preState]));
      const targetItemTrai = cloneItemsTrai.find(
        (itemTrai) => itemTrai.idVeTrai === idVeTrai
      );
      if (targetItemTrai) {
        targetItemTrai.options.forEach((option) => (option.isSelected = false));
        const targetOption = targetItemTrai.options.find(
          (option) => option.nhan === nhanChon
        );
        if (targetOption) targetOption.isSelected = true;
      }
      return cloneItemsTrai;
    });
    //2. Dispatch lên store hws data
    console.log(idVeTrai, nhanChon, veTrai);
  };

  return (
    <CardHomework>
      <AutoResizeTextarea
        inputValue={`Đề bài: ${renderDatas.deBai || null}`}
        ordinalNumber={homeworkData.ordinalNumber || ""}
      />
      <hr className="line-gray" />

      <Status tinhTrang={renderDatas.tinhTrang} />
      <hr className="line-gray" />
      <div className="card-homework-student-work-wrapper">
        <div className="matching-grid">
          {/* VẾ TRÁI */}
          <VeTrai
            itemsTrai={itemsTrai}
            layDapAnCuaHocSinh={layDapAnCuaHocSinh}
          />
          {/* VẾ PHẢI */}
          <VePhai itemsPhai={itemsPhai} />
        </div>
      </div>

      {/* {blockContent && <BlockContentBar />} */}
      <HomeworkActionsBar
        doAction1={layDapAnCuaHocSinh}
        bounceButton={studentDo}
      />
    </CardHomework>
  );
}
const VeTrai = ({ itemsTrai, layDapAnCuaHocSinh }) => {
  return (
    <div className="matching-grid-equal-wrapper">
      {itemsTrai.length > 0 &&
        itemsTrai.map((iTrai) => (
          <div key={iTrai.idVeTrai} className="matching-grid-left-item">
            {iTrai.hinhTrai && (
              <Image
                src={iTrai.hinhTrai}
                alt="hình minh họa"
                height={80}
                width={80}
              />
            )}
            <div className="flex flex-col flex-wrap gap-3">
              <p>{iTrai.veTrai}</p>
              <div className="flex flex-row flex-wrap gap-2">
                {iTrai.options.length > 0 &&
                  iTrai.options.map((opt) => (
                    <div
                      key={Math.random().toString() + opt.nhan}
                      className={
                        opt.isSelected
                          ? "option-item-selected !w-fit"
                          : "option-item !w-fit"
                      }
                      onClick={layDapAnCuaHocSinh.bind(this, {
                        idVeTrai: iTrai.idVeTrai,
                        nhanChon: opt.nhan,
                        veTrai: iTrai.veTrai,
                      })}
                    >
                      {opt.nhan}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const VePhai = ({ itemsPhai }) => {
  return (
    <div className="matching-grid-equal-wrapper">
      {itemsPhai.length > 0 &&
        itemsPhai.map((iPhai) => (
          <div key={iPhai.idVePhai} className="matching-grid-right-item">
            {/* <div className="flex flex-row gap-2 border-2 h-full border-coBlue2 rounded-xl overflow-hidden"> */}
            {/* Nhãn bự cho vế phải */}
            <div className="matching-grid-right-label-wrapper">
              <p className="matching-grid-right-label">{iPhai.nhan}</p>
            </div>
            {/* Phần text mô tả và hình */}
            <div className="flex flex-col gap-2 p-3">
              <p className="font-semibold">{iPhai.vePhai}</p>
              <div className="matching-grid-right-image-wrapper">
                {iPhai.hinhPhai && (
                  <Image
                    src={iPhai.hinhPhai}
                    alt="Hình minh họa"
                    width={120}
                    height={120}
                    layout="responsive"
                    objectFit="cover"
                  />
                )}
              </div>
            </div>
          </div>
          // </div>
        ))}
    </div>
  );
};
