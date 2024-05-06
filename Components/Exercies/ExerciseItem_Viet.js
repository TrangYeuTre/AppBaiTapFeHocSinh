import Card from "../UI/Card";
import LoadImageFailMessage from "../UI/LoadImageFailMessage";
import BlockContentBar from "../UI/BlockContentBar";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";

export default function ExerciseItemViet({
  datas,
  tinhTrang,
  _id,
  baiLamCuaHocSinh,
  dapAnCuaGiaoVien,
  data,
  soLanNop,
  instanceHomeworks,
}) {
  const dispatch = useDispatch();
  const showStudentAnswers = useSelector(
    (state) => state.hws.showStudentAnswers
  );
  const [homeworkWrittingRender, setHomeworkWrittingRender] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      dapAnCuaGiaoVien.forEach((dapAn) => {
        const dapAnCuaGiaoVienEle = document.getElementById(
          `bai-sua-giao-vien-${dapAn.id}`
        );
        if (dapAnCuaGiaoVienEle)
          dapAnCuaGiaoVienEle.innerHTML = dapAn.content.baiSuaInnerHtml;
      });
    }, 50);
  }, [dapAnCuaGiaoVien]);

  useEffect(() => {
    const homeworkWrittingRender =
      instanceHomeworks.convertHomeworkWrittingDatasToRender({
        writtingDatas: datas,
        soLanNop,
        tinhTrang,
        baiLamCuaHocSinh,
      });
    setHomeworkWrittingRender(homeworkWrittingRender);
  }, [datas]);

  // const layDapAnCuaHocSinh = (dataId) => {
  //   const ele = document.getElementById(`${_id}-${dataId}`);
  //   const valueGot = ele.value || "";
  //   console.log(_id, dataId);
  //   return;
  //   dispatch(
  //     HwsActions.updateAnswersWriting({
  //       homeworkId: _id,
  //       homeworkWrittingId: dataId,
  //       answer: valueGot,
  //       scrollToElementId: `viet-${dataId}`,
  //     })
  //   );
  // };

  return homeworkWrittingRender.map((item) => {
    return (
      <div
        className="flex flex-col gap-0"
        key={Math.random().toString() + item.id}
      >
        <Card plusStyle={`p-0 w-full ${item.blockContent && "disabled-card"}`}>
          <div className="writting-wrapper">
            <AutoResizeTextarea inputValue={`Đề bài: ${data.deBai || null}`} />
            <hr className="line-white" />
            <ImagePreview url={item.imageUrl} />
            <Status tinhTrang={tinhTrang} />
            <hr className="line-white" />
            <p className="guide-text" id={`viet-${item.id}`}>
              Bé hãy điền đáp án vào chỗ trống
            </p>

            {item.imageUrl === "/assets/404-error.png" && (
              <LoadImageFailMessage />
            )}
            <textarea
              required
              placeholder="Nhập đáp án vào đây..."
              className="w-full h-32"
              minLength={3}
              disabled={item.imageUrl === "/assets/404-error.png" ? true : null}
              id={`${_id}-${item.id}`}
              defaultValue={showStudentAnswers ? item.content : null}
            />
            {/* <button
              type="button"
              className={`btn btn-main ${item.blockContent && "line-through"}`}
              onClick={layDapAnCuaHocSinh.bind(this, item.id)}
            >
              Xác nhận
            </button> */}
          </div>
          {item.blockContent && <BlockContentBar />}
        </Card>
        {tinhTrang === "Đã sửa" && <BaiSuaCuaGiaoVien item={item} />}
      </div>
    );
  });
}

const BaiSuaCuaGiaoVien = ({ item }) => {
  return (
    <div
      className="p-6 bg-coGreen2 rounded-xl"
      id={`bai-sua-giao-vien-${item.id}`}
    ></div>
  );
};
