import Card from "../UI/Card";
import Image from "next/image";
import BlockContentBar from "../UI/BlockContentBar";
import LoadImageFailMessage from "../UI/LoadImageFailMessage";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";

export default function ExerciseItemDienKhuyet({
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

  const [homeworkFillEmptyRender, setHomeworkFillEmptyRender] = useState([]);

  useEffect(() => {
    const convertedHomeworkFillEmptyRender =
      instanceHomeworks.convertHomeworkFillEmptyDatasToRender({
        fillEmptyDatas: datas,
        soLanNop,
        tinhTrang,
        baiLamCuaHocSinh,
        dapAnCuaGiaoVien,
      });
    setHomeworkFillEmptyRender(convertedHomeworkFillEmptyRender);
  }, [datas]);

  // const layDapAnCuaHocSinh = (dataId) => {
  //   const ele = document.getElementById(`${_id}-${dataId}`);
  //   const valueGot = ele.value || "";
  //   dispatch(
  //     HwsActions.updateAnswersFillEmpty({
  //       homeworkId: _id,
  //       homeworkFillEmptyId: dataId,
  //       answer: valueGot,
  //       scrollToElementId: `dien-khuyet-${dataId}`,
  //     })
  //   );
  // };
  return homeworkFillEmptyRender.map((item) => {
    return (
      <div
        className="flex flex-col mb-6"
        key={Math.random().toString() + item.id}
      >
        <Card plusStyle={`p-0 w-full ${item.blockContent && "disabled-card"}`}>
          <div className="fill-empty-wrapper">
            <AutoResizeTextarea inputValue={`Đề bài: ${data.deBai || null}`} />
            <hr className="line-white" />

            <ImagePreview url={item.imageUrl} />
            <Status tinhTrang={tinhTrang} />
            <hr className="line-white" />
            {/* <label>Đáp án</label> */}
            <p className="guide-text" id={`dien-khuyet-${item.id}`}>
              Bé hãy điền đáp án vào chỗ trống
            </p>
            {item.imageUrl === "/assets/404-error.png" && (
              <LoadImageFailMessage />
            )}

            {item.kieu === "Điền khuyết đầu" && (
              <DienKhuyetDau
                _id={_id}
                item={item}
                showStudentAnswers={showStudentAnswers}
              />
            )}
            {item.kieu === "Điền khuyết cuối" && (
              <DienKhuyetCuoi
                _id={_id}
                item={item}
                showStudentAnswers={showStudentAnswers}
              />
            )}
            {item.kieu === "Điền khuyết giữa" && (
              <DienKhuyetGiua
                _id={_id}
                item={item}
                showStudentAnswers={showStudentAnswers}
              />
            )}
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

const DienKhuyetDau = ({ _id, item, showStudentAnswers }) => {
  return (
    <div className="fill-empty-option">
      <input
        id={`${_id}-${item.id}`}
        type="text"
        required
        placeholder="Nhập đáp án..."
        minLength={2}
        defaultValue={showStudentAnswers ? item.content : null}
      />
      <p>{item.ve1}</p>
    </div>
  );
};

const DienKhuyetGiua = ({ _id, item, showStudentAnswers }) => {
  return (
    <div className="fill-empty-option">
      <p>{item.ve1}</p>
      <input
        id={`${_id}-${item.id}`}
        type="text"
        required
        placeholder="Nhập đáp án..."
        minLength={2}
        defaultValue={showStudentAnswers ? item.content : null}
      />
      <p>{item.ve2}</p>
    </div>
  );
};
const DienKhuyetCuoi = ({ _id, item, showStudentAnswers }) => {
  return (
    <div className="fill-empty-option">
      <p>{item.ve1}</p>
      <input
        id={`${_id}-${item.id}`}
        type="text"
        required
        placeholder="Nhập đáp án..."
        minLength={2}
        defaultValue={showStudentAnswers ? item.content : null}
      />
    </div>
  );
};
const BaiSuaCuaGiaoVien = ({ item }) => {
  return (
    <div className="p-6 bg-coGreen2 rounded-xl flex flex-col gap-6 pointer-events-none">
      <div className="flex flex-row gap-6">
        <label>Kết quả: </label>
        <div className={item.dat ? "option-item-selected" : "option-item"}>
          Đạt
        </div>
        <div className={!item.dat ? "option-item-selected" : "option-item"}>
          Không đạt
        </div>
      </div>
      <textarea
        className="w-full h-32"
        id={`gv-nhan-xet-dien-khuyet-${item.id}`}
        placeholder="Giáo viên không có nhận xét."
        defaultValue={item.dapAnCuaGiaoVien || null}
      />
    </div>
  );
};
