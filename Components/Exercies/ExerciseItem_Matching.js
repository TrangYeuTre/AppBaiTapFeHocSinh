import Card from "../UI/Card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import Status from "./Status";
import { v4 as uuidv4 } from "uuid";
import BlockContentBar from "../UI/BlockContentBar";

export default function ExerciseItemMatching({
  datas,
  tinhTrang,
  _id,
  baiTapLonId,
  baiLamCuaHocSinh,
  data,
  xemBaiDaLam,
  soLanNop,
}) {
  //baiTapLonId là _id của obj bài tập vê nàh chính của hs trên mongodb
  //_id là id của obj bên trong prop baiTapVeNha
  const dispatch = useDispatch();
  const recentElementConfirmId = useSelector(
    (state) => state.hws.recentElementConfirmId
  );

  //State render 2 vế
  const [itemsTrai, setItemsTrai] = useState([]);
  const [itemsPhai, setItemsPhai] = useState([]);

  //Tạo một cái target id để cuộn xuống phần tử sau khi update
  const targetId = "matching-" + _id;

  //Side effect: xử lý load ban đầu
  useEffect(() => {
    const { itemsTrai, itemsPhai, itemsPhaiRandom } = datas;
    if (itemsPhaiRandom) setItemsPhai(itemsPhaiRandom);
    //Xử lý fill đáp án đã cohnj
    const clone = [...JSON.parse(JSON.stringify(itemsTrai))];
    baiLamCuaHocSinh.forEach((item) => {
      const { id: idVeTrai, content } = item;
      let targetNhan = "";

      //1.Từ content tra trong itemsPhaiRandom để tìm nhãn
      const targetIpRandom = itemsPhaiRandom.find(
        (ip) => ip.vePhai === content
      );
      if (targetIpRandom) targetNhan = targetIpRandom.nhan;
      //2. Có nhãn rồi thì tim trong vế trái item tương ứng để kích hoạch
      const targetIt = clone.find((it) => it.idVeTrai === idVeTrai);
      if (targetIt) {
        const cloneOptions = JSON.parse(JSON.stringify(targetIt.options));
        cloneOptions.forEach((opt) => (opt.isSelected = false));
        const targetOpt = cloneOptions.find((opt) => opt.nhan === targetNhan);
        if (targetOpt) targetOpt.isSelected = true;
        targetIt.options = cloneOptions;
      }
    });
    setItemsTrai(clone);
  }, []);

  //SIde effect cuộn xuống bài bấm xác nhận gần nhất
  useEffect(() => {
    setTimeout(() => {
      const ele = document.getElementById(recentElementConfirmId);
      if (ele) ele.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [recentElementConfirmId]);

  const layDapAnCuaHocSinh = ({ idVeTrai, nhanChon, veTrai }) => {
    //Chú ý: ta sẽ update thẳng lên store redux, nó tích hợp chọn luôn kết quả tương ứng
    dispatch(
      HwsActions.updateAnswersMatching({
        idVeTrai,
        nhanChon,
        veTrai,
        targetId,
        idObjBtvn: _id,
      })
    );
  };

  //Biến xử lý render khoá tương tác
  let blockContent = false;
  if (+soLanNop >= 3) blockContent = true;

  return (
    <Card plusStyle={`p-0 w-full ${blockContent && "disabled-card"}`}>
      <div className="grid grid-cols-2 p-3 gap-12">
        {/* VẾ TRÁI */}
        <div className="col-span-1 flex flex-col flex-1 gap-4" id={targetId}>
          {itemsTrai.length > 0 &&
            itemsTrai.map((iTrai) => (
              <div key={iTrai.idVeTrai}>
                <div className="h-[200px] flex flex-row gap-2 flex-wrap items-center">
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
                              opt.isSelected && xemBaiDaLam
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
              </div>
            ))}
        </div>
        {/* VẾ PHẢI */}
        <div className="col-span-1 flex flex-col flex-1 gap-4">
          {itemsPhai.length > 0 &&
            itemsPhai.map((iPhai) => (
              <div key={iPhai.idVePhai}>
                <div className="flex flex-row gap-2 h-[200px] border-2 border-coBlue2 rounded-xl overflow-hidden">
                  {/* Nhãn bự cho vế phải */}
                  <div className="px-2 bg-coBlue2 flex flex-row items-center h-full">
                    <p className="text-3xl uppercase font-bold text-coWhite">
                      {iPhai.nhan}
                    </p>
                  </div>
                  {/* Phần text mô tả và hình */}
                  <div className="flex flex-col gap-2">
                    <p>{iPhai.vePhai}</p>
                    <div className="w-full max-h-[180px] overflow-hidden flex flex-row items-center justify-center">
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
              </div>
            ))}
        </div>
      </div>
      {blockContent && <BlockContentBar />}
    </Card>
  );
}
