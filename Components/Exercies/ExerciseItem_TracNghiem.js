import Card from "../UI/Card";
import ImagePreview from "../UI/ImagePreview";
import BlockContentBar from "../UI/BlockContentBar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import Status from "./Status";

export default function ExerciseItemTracNghiem({
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

  const [options, setOptions] = useState([]);
  //Lấy url hình minh họa nếu có
  const imageUrl = data.tracNghiem.imageUrl || "";

  //Thêm prop lựa chọn cho options
  useEffect(() => {
    const opts = datas.map((item) => {
      return { id: item.id, content: item.content, isSelected: false };
    });
    setOptions(opts);
    //QUAN TRỌNG: ta không để dependencies là datas vì chỉ cần tạo một lần
    //khi chọn 1 đáp án cũng là update hws trên store, nên để tránh rerender ở
    //đây ta không để dependecies
  }, []);

  //Side effect điền lại kết quả chọn nếu học sinh đã làm bài này
  useEffect(() => {
    if (!baiLamCuaHocSinh || baiLamCuaHocSinh.length === 0) return;
    setOptions((preState) => {
      const clone = [...preState];
      const selectedObj = baiLamCuaHocSinh[0];
      const target = clone.find((item) => item.id === selectedObj.id);
      if (target) target.isSelected = true;
      return clone;
    });
  }, []);

  //SIde effect cuộn xuống bài bấm xác nhận gần nhất
  useEffect(() => {
    setTimeout(() => {
      const ele = document.getElementById(`trac-nghiem-${baiTapLonId}`);
      if (ele) ele.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [recentElementConfirmId]);

  const layDapAnCuaHocSinh = (optId) => {
    //1. Active option được chọn nội bộ
    setOptions((preState) => {
      const clone = [...preState];
      clone.forEach((item) => (item.isSelected = false));
      const target = clone.find((item) => item.id === optId);
      if (target) target.isSelected = true;
      return clone;
    });
    //2. Update kết quả chọn này lên store tương ứng
    dispatch(
      HwsActions.updateAnswersTrueFalse({
        idObjBaiTap: baiTapLonId,
        idBaiTapCon: _id,
        cauTraLoi: optId,
      })
    );
  };

  //Biến xử lý render khoá tương tác
  let blockContent = false;
  if (+soLanNop >= 3) blockContent = true;

  return (
    <Card
      plusStyle={`p-0 w-full ${blockContent && "disabled-card"}`}
      key={Math.random()}
    >
      <div className="flex flex-col gap-3 bg-coGray5 px-3 py-6">
        <h3 id={`trac-nghiem-${baiTapLonId}`}>Đề bài: {data.deBai || null}</h3>
        {imageUrl && <ImagePreview url={imageUrl} />}
        <Status tinhTrang={tinhTrang} />
        <div className="flex flex-row gap-3">
          {options.length > 0 &&
            options.map((opt) => (
              <div
                key={Math.random().toString() + opt.id}
                className={
                  opt.isSelected && xemBaiDaLam
                    ? "option-item-selected"
                    : "option-item"
                }
                onClick={layDapAnCuaHocSinh.bind(this, opt.id)}
              >
                {opt.content}
              </div>
            ))}
        </div>
      </div>
      {blockContent && <BlockContentBar />}
    </Card>
  );
}
