import { useState, useEffect, useMemo } from "react";
import ExerciseItemViet from "./ExerciseItem_Viet";
import ExerciseItemTracNghiem from "./ExerciseItem_TracNghiem";
import ExerciseItemDienKhuyet from "./ExerciseItem_DienKhuyet";
import ExerciseItemMatching from "./ExerciseItem_Matching";

export default function ExerciseGroup({ hw, instanceHomeworks }) {
  const {
    _id,
    dapAnCuaGiaoVien,
    baiLamCuaHocSinh,
    data,
    ketQua,
    tinhTrang,
    baiTapLonId,
    soLanNop,
  } = hw;

  const currentHomework = useMemo(() => {
    return instanceHomeworks.findHomeworkById(_id);
  }, [_id]);
  const currentHomeworkType = useMemo(() => {
    return instanceHomeworks.getHomeworkType(currentHomework);
  }, [currentHomework]);
  const currentHomeworkDatas = useMemo(() => {
    return instanceHomeworks.getHomeworkTypeDatas(
      currentHomework,
      currentHomeworkType
    );
  }, [currentHomework, currentHomeworkType]);

  return (
    <>
      {currentHomeworkType === "viet" && (
        <ExerciseItemViet
          instanceHomeworks={instanceHomeworks}
          tinhTrang={tinhTrang}
          datas={currentHomeworkDatas}
          _id={_id}
          baiLamCuaHocSinh={baiLamCuaHocSinh}
          dapAnCuaGiaoVien={dapAnCuaGiaoVien}
          data={data}
          soLanNop={soLanNop}
        />
      )}
      {currentHomeworkType === "tracNghiem" && (
        <ExerciseItemTracNghiem
          instanceHomeworks={instanceHomeworks}
          tinhTrang={tinhTrang}
          datas={currentHomeworkDatas}
          _id={_id}
          baiTapLonId={baiTapLonId}
          baiLamCuaHocSinh={baiLamCuaHocSinh}
          dapAnCuaGiaoVien={dapAnCuaGiaoVien}
          data={data}
          soLanNop={soLanNop}
        />
      )}
      {currentHomeworkType === "dienKhuyet" && (
        <ExerciseItemDienKhuyet
          instanceHomeworks={instanceHomeworks}
          tinhTrang={tinhTrang}
          datas={currentHomeworkDatas}
          _id={_id}
          baiLamCuaHocSinh={baiLamCuaHocSinh}
          dapAnCuaGiaoVien={dapAnCuaGiaoVien}
          data={data}
          soLanNop={soLanNop}
        />
      )}
      {currentHomeworkType === "matching" && (
        <ExerciseItemMatching
          instanceHomeworks={instanceHomeworks}
          tinhTrang={tinhTrang}
          datas={currentHomeworkDatas}
          _id={_id}
          baiLamCuaHocSinh={baiLamCuaHocSinh}
          dapAnCuaGiaoVien={dapAnCuaGiaoVien}
          data={data}
          soLanNop={soLanNop}
        />
      )}
    </>
  );
}
