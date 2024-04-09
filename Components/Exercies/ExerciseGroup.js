import { useState, useEffect } from "react";
import ExerciseItemViet from "./ExerciseItem_Viet";
import ExerciseItemTracNghiem from "./ExerciseItem_TracNghiem";
import ExerciseItemDienKhuyet from "./ExerciseItem_DienKhuyet";
import ExerciseItemMatching from "./ExerciseItem_Matching";

export default function ExerciseGroup({ hw, xemBaiDaLam }) {
  //Bung props ra cho dễ quản lý
  //Chú ý: _id này là id của obj bên trong prop baiTapVeNha của obj homework trên db
  //Dùng _id này để tìm và update
  //baiTapLonId là id của 1 obj bài tập về nhà của học sinh lưuu trên db
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
  const kieuBaiTap = getTypeExercise(data);
  const datasRenderChoKieuBaiTap = data[kieuBaiTap].datas;

  return (
    <>
      {kieuBaiTap === "viet" && (
        <ExerciseItemViet
          tinhTrang={tinhTrang}
          datas={datasRenderChoKieuBaiTap}
          _id={_id}
          baiLamCuaHocSinh={baiLamCuaHocSinh}
          data={data}
          xemBaiDaLam={xemBaiDaLam}
          soLanNop={soLanNop}
        />
      )}
      {kieuBaiTap === "tracNghiem" && (
        <ExerciseItemTracNghiem
          tinhTrang={tinhTrang}
          datas={datasRenderChoKieuBaiTap}
          _id={_id}
          baiTapLonId={baiTapLonId}
          baiLamCuaHocSinh={baiLamCuaHocSinh}
          data={data}
          xemBaiDaLam={xemBaiDaLam}
          soLanNop={soLanNop}
        />
      )}
      {kieuBaiTap === "dienKhuyet" && (
        <ExerciseItemDienKhuyet
          tinhTrang={tinhTrang}
          datas={datasRenderChoKieuBaiTap}
          _id={_id}
          baiLamCuaHocSinh={baiLamCuaHocSinh}
          data={data}
          xemBaiDaLam={xemBaiDaLam}
          soLanNop={soLanNop}
        />
      )}
      {kieuBaiTap === "matching" && (
        <ExerciseItemMatching
          tinhTrang={tinhTrang}
          datas={datasRenderChoKieuBaiTap}
          _id={_id}
          baiLamCuaHocSinh={baiLamCuaHocSinh}
          data={data}
          xemBaiDaLam={xemBaiDaLam}
          soLanNop={soLanNop}
        />
      )}
    </>
  );
}

//CB kiểm tra loại bài đang được render
const getTypeExercise = (data) => {
  let result = "";
  if (!data) return result;
  if (data.dienKhuyet.active) result = "dienKhuyet";
  if (data.tracNghiem.active) result = "tracNghiem";
  if (data.viet.active) result = "viet";
  if (data.matching.active) result = "matching";
  return result;
};
