import Card from "../UI/Card";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { checkBlockHomework } from "../../helper/uti";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";

export default function ExerciseItemMatching({
  datas,
  tinhTrang,
  _id,
  baiLamCuaHocSinh,
  dapAnCuaGiaoVien,
  data,
  soLanNop,
  instanceHomeworks,
}) {
  const blockContent = useMemo(() => {
    return checkBlockHomework({ soLanNop, tinhTrang });
  }, [soLanNop, tinhTrang]);

  const [itemsTrai, setItemsTrai] = useState([]);
  const [itemsPhai, setItemsPhai] = useState([]);

  console.log(itemsTrai);
  console.log(itemsPhai);

  //Tạo một cái target id để cuộn xuống phần tử sau khi update
  const targetId = "matching-" + _id;

  useEffect(() => {
    const { itemsTraiWithStudentWork, itemsPhaiRandom } =
      instanceHomeworks.convertHomeworkMatchingToRender({
        matchingDatas: datas,
        baiLamCuaHocSinh,
      });
    if (itemsPhaiRandom) setItemsPhai(itemsPhaiRandom);
    if (itemsTraiWithStudentWork) setItemsTrai(itemsTraiWithStudentWork);
  }, [datas]);

  return (
    <div className="flex flex-col gap-0">
      <Card plusStyle={`p-0 w-full ${blockContent && "disabled-card"}`}>
        <div className="matching-wrapper">
          <AutoResizeTextarea
            id={`matching-${_id}`}
            inputValue={`Đề bài: ${data.deBai || null}`}
          />
          <hr className="line-white" />
          <Status tinhTrang={tinhTrang} />
        </div>
        <hr className="line-white" />
        <div className="matching-grid">
          {/* VẾ TRÁI */}
          <VeTrai targetId={targetId} itemsTrai={itemsTrai} />
          {/* VẾ PHẢI */}
          <VePhai itemsPhai={itemsPhai} />
        </div>
      </Card>
      {tinhTrang === "Đã sửa" && (
        <BaiSuaCuaGiaoVien dapAnCuaGiaoVien={dapAnCuaGiaoVien} />
      )}
    </div>
  );
}

const VeTrai = ({ targetId, itemsTrai }) => {
  return (
    <div className="matching-grid-equal-wrapper" id={targetId}>
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
                  <div
                    className="w-full relative
                h-[120px] lg:h-[200px]"
                  >
                    <Image
                      src={iPhai.hinhPhai}
                      alt="Hình minh họa bài tập matching"
                      fill={true}
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          // </div>
        ))}
    </div>
  );
};
const BaiSuaCuaGiaoVien = ({ dapAnCuaGiaoVien }) => {
  return (
    <div className="p-6 bg-coGreen2 rounded-xl flex flex-col gap-2">
      {dapAnCuaGiaoVien.length > 0 &&
        dapAnCuaGiaoVien.map((dapAn) => (
          <div
            key={Math.random().toString() + dapAn.veTrai}
            className="grid grid-cols-2 gap-3 py-2 border-b-2 last:border-b-0"
          >
            <p className="col-span-1">{dapAn.veTrai}</p>
            <p className="font-semibold text-coRed col-span-1">
              {dapAn.vePhai}
            </p>
          </div>
        ))}
    </div>
  );
};
