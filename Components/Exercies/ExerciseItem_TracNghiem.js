import Card from "../UI/Card";
import ImagePreview from "../UI/ImagePreview";
import { useState, useEffect, useMemo } from "react";
import { checkBlockHomework } from "../../helper/uti";
import Status from "./Status";
import AutoResizeTextarea from "./AutoHeightTextarea";

export default function ExerciseItemTracNghiem({
  datas,
  tinhTrang,
  _id,
  baiLamCuaHocSinh,
  dapAnCuaGiaoVien,
  data,
  soLanNop,
  instanceHomeworks,
}) {
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
                    opt.isSelected ? "option-item-selected" : "option-item"
                  }
                >
                  {opt.content}
                </div>
              ))}
          </div>
        </div>
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
