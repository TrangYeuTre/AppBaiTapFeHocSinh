import Card from "../UI/Card";
import ImagePreview from "../UI/ImagePreview";
import BlockContentBar from "../UI/BlockContentBar";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import { checkBlockHomework } from "../../helper/uti";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";

export default function ExerciseItemTracNghiem({
  datas,
  tinhTrang,
  _id,
  baiTapLonId,
  baiLamCuaHocSinh,
  dapAnCuaGiaoVien,
  data,
  soLanNop,
  instanceHomeworks,
}) {
  const dispatch = useDispatch();

  const luaChonDungContent = useMemo(() => {
    let noiDungLuaChonDung = "";
    if (!dapAnCuaGiaoVien || dapAnCuaGiaoVien.length === 0)
      return noiDungLuaChonDung;
    const { luaChonDung, result } = dapAnCuaGiaoVien[0];
    const luaChonDungContent = datas.find(
      (item) => item.id === luaChonDung
    ).content;
    noiDungLuaChonDung = luaChonDungContent;
    return noiDungLuaChonDung;
  }, [dapAnCuaGiaoVien]);

  const result = useMemo(() => {
    if (!dapAnCuaGiaoVien || dapAnCuaGiaoVien.length === 0) return;
    const { luaChonDung, result } = dapAnCuaGiaoVien[0];
    return result;
  }, [dapAnCuaGiaoVien]);

  const showStudentAnswers = useSelector(
    (state) => state.hws.showStudentAnswers
  );
  const imageUrl = data.tracNghiem.imageUrl || "";

  const blockContent = useMemo(() => {
    return checkBlockHomework({ soLanNop, tinhTrang });
  }, [soLanNop, tinhTrang]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const optionsRender =
      instanceHomeworks.convertHomeworkTrueFalseDatasToRender({
        trueFalseDatas: datas,
        baiLamCuaHocSinh,
      });
    setOptions(optionsRender);
  }, [datas]);

  const layDapAnCuaHocSinh = (optId) => {
    setOptions((preState) => {
      const clone = [...preState];
      clone.forEach((item) => (item.isSelected = false));
      const target = clone.find((item) => item.id === optId);
      if (target) target.isSelected = true;
      return clone;
    });
    dispatch(
      HwsActions.updateAnswersTrueFalse({
        homeworkId: baiTapLonId,
        homeworkTrueFalseId: _id,
        answer: optId,
        scrollToElementId: `de-bai-trac-nghiem-${_id}`,
      })
    );
  };

  return (
    <div className="flex flex-col gap-0">
      <Card
        plusStyle={`p-0 w-full ${blockContent && "disabled-card"}`}
        key={Math.random()}
      >
        <div className="true-false-wrapper">
          {/* <h3 id={`de-bai-trac-nghiem-${_id}`}>Đề bài: {data.deBai || null}</h3> */}
          <AutoResizeTextarea
            id={`de-bai-trac-nghiem-${_id}`}
            inputValue={`Đề bài: ${data.deBai || null}`}
          />
          <hr className="line-white" />

          {imageUrl && <ImagePreview url={imageUrl} />}
          <Status tinhTrang={tinhTrang} />
          <hr className="line-white" />
          <p className="guide-text">Bé hãy chọn đáp án đúng</p>
          <div className="true-false-options-wrapper">
            {options.length > 0 &&
              options.map((opt) => (
                <div
                  key={Math.random().toString() + opt.id}
                  className={
                    opt.isSelected && showStudentAnswers
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
      {tinhTrang === "Đã sửa" && (
        <BaiSuaCuaGiaoVien
          result={result}
          luaChonDungContent={luaChonDungContent}
        />
      )}
    </div>
  );
}

const BaiSuaCuaGiaoVien = ({ result, luaChonDungContent }) => {
  return (
    <div className="p-6 bg-coGreen2 rounded-xl flex flex-col gap-6">
      <div className="flex flex-row gap-4">
        <label>Kết quả: </label>
        <p className="font-bold text-coRed mr-2">
          {result ? "Đạt" : "Không đạt"}
        </p>
        <label>Đáp án đúng: </label>
        <p className="font-bold text-coRed mr-2">{luaChonDungContent}</p>
      </div>
    </div>
  );
};
