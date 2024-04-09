import Card from "../UI/Card";
import Image from "next/image";
import BlockContentBar from "../UI/BlockContentBar";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect } from "react";
import { isValidImageUrl } from "../../helper/uti";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import Status from "./Status";

export default function ExerciseItemViet({
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
  //Xử lý kiểm tra hình có bị lỗi không (Trả về chỉ để render đề bài)
  // phần render bài làm của học sinh xử lý riêng
  useEffect(() => {
    //1. xử lý hình lỗi
    const handled = datas.map((item) => {
      const validImage = isValidImageUrl(item.imageUrl);
      return {
        id: item.id,
        imageUrl: !validImage ? "/assets/404-error.png" : item.imageUrl,
        content: "",
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
      HwsActions.updateAnswersWriting({
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
          <textarea
            required
            placeholder="Nhập đáp án vào đây..."
            className="w-full h-32"
            minLength={3}
            disabled={item.imageUrl === "/assets/404-error.png" ? true : null}
            id={`${_id}-${item.id}`}
            defaultValue={xemBaiDaLam ? item.content : null}
          />
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
