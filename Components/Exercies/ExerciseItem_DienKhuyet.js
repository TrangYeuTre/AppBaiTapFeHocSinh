import Card from "../UI/Card";
import Image from "next/image";
import BlockContentBar from "../UI/BlockContentBar";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect } from "react";
import { isValidImageUrl } from "../../helper/uti";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import Status from "./Status";

export default function ExerciseItemDienKhuyet({
  datas,
  tinhTrang,
  _id,
  baiLamCuaHocSinh,
  data,
  xemBaiDaLam,
  soLanNop,
}) {
  const dispatch = useDispatch();
  const recentElementConfirmId = useSelector(
    (state) => state.hws.recentElementConfirmId
  );
  const [handledDatas, setHandledDatas] = useState([]);
  // console.log("---Kiểm tra datas dk:---");
  // console.log(handledDatas);
  //Xử lý kiểm tra hình có bị lỗi không (Trả về chỉ để render đề bài)
  // phần render bài làm của học sinh xử lý riêng
  useEffect(() => {
    //1. xử lý hình lỗi
    const handled = datas.map((item) => {
      const validImage = isValidImageUrl(item.imageUrl);
      return {
        id: item.id,
        //Kiểu để phân loại 3 dạng điền khuyết mà render
        kieu: item.kieu,
        imageUrl: !validImage ? "/assets/404-error.png" : item.imageUrl,
        content: "",
        ve1: item.ve1 || "",
        ve2: item.ve2 || "",
      };
    });
    //2. xử lý fill nội dung bài làm của học sinh nếu có
    if (baiLamCuaHocSinh.length > 0) {
      baiLamCuaHocSinh.forEach((bai) => {
        const target = handled.find((item) => item.id === bai.id);
        if (target) target.content = bai.content;
      });
    }
    setHandledDatas(handled);
  }, [datas]);

  //SIde effect cuộn xuống bài bấm xác nhận gần nhất
  useEffect(() => {
    setTimeout(() => {
      const ele = document.getElementById(`${_id}-${recentElementConfirmId}`);
      if (ele) ele.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [recentElementConfirmId]);

  const layDapAnCuaHocSinh = (dataId) => {
    const ele = document.getElementById(`${_id}-${dataId}`);
    const valueGot = ele.value || "";
    dispatch(
      HwsActions.updateAnswersFillEmpty({
        idObjBaiTap: _id,
        idBaiTapCon: dataId,
        cauTraLoi: valueGot,
      })
    );
  };

  //Biến xử lý render khoá tương tác
  let blockContent = false;
  if (+soLanNop >= 3) blockContent = true;

  return handledDatas.map((item) => {
    return (
      <Card
        plusStyle={`p-0 w-full ${blockContent && "disabled-card"}`}
        key={Math.random()}
      >
        <div className="flex flex-col gap-3 bg-coGray5 px-3 py-6">
          <h3>Đề bài: {data.deBai || null}</h3>
          <ImagePreview url={item.imageUrl} />
          <Status tinhTrang={tinhTrang} />
          <hr className="border-coWhite border-2" />
          <label>Đáp án</label>
          {item.imageUrl === "/assets/404-error.png" && (
            <p className="text-coRed">
              Hình lỗi rồi. Nhắn cô Trang sửa lại nhé.
            </p>
          )}

          {item.kieu === "Điền khuyết đầu" && (
            <div className="flex flex-row gap-3 flex-wrap items-center">
              <input
                id={`${_id}-${item.id}`}
                type="text"
                required
                placeholder="Nhập đáp án..."
                minLength={2}
                defaultValue={xemBaiDaLam ? item.content : null}
              />
              <p>{item.ve1}</p>
            </div>
          )}
          {item.kieu === "Điền khuyết cuối" && (
            <div className="flex flex-row gap-3 flex-wrap items-center">
              <p>{item.ve1}</p>
              <input
                id={`${_id}-${item.id}`}
                type="text"
                required
                placeholder="Nhập đáp án..."
                minLength={2}
                defaultValue={xemBaiDaLam ? item.content : null}
              />
            </div>
          )}
          {item.kieu === "Điền khuyết giữa" && (
            <div className="flex flex-row gap-3 flex-wrap items-center">
              <p>{item.ve1}</p>
              <input
                id={`${_id}-${item.id}`}
                type="text"
                required
                placeholder="Nhập đáp án..."
                minLength={2}
                defaultValue={xemBaiDaLam ? item.content : null}
              />
              <p>{item.ve2}</p>
            </div>
          )}
          <button
            type="button"
            className={`btn btn-main ${blockContent && "line-through"}`}
            onClick={layDapAnCuaHocSinh.bind(this, item.id)}
          >
            Xác nhận
          </button>
        </div>
        {blockContent && <BlockContentBar />}
      </Card>
    );
  });
}
