import { createSlice } from "@reduxjs/toolkit";

const initState = {
  hws: [],
  updatingStore: false,
};

const HwsSlice = createSlice({
  name: "hws",
  initialState: initState,
  reducers: {
    setHws(state, action) {
      state.hws = action.payload;
    },
    clearHws(state) {
      state.hws = [];
      state.recentElementConfirmId = "";
    },
    updateAnswersFillEmpty(state, action) {
      state.updatingStore = true;
      const { idBaiTapVeNhaCon, idBaiTapDienKhuyet, content } = action.payload;
      const cloneHomeworks = [...state.hws];

      for (let i = 0; i < cloneHomeworks.length; i++) {
        const baiTapVeNha = cloneHomeworks[i].baiTapVeNha;
        const baiTapCon = baiTapVeNha.find(
          (baiTap) => baiTap._id === idBaiTapVeNhaCon
        );
        if (!baiTapCon) continue;

        const baiLamCuaHocSinh = baiTapCon.baiLamCuaHocSinh;

        const baiLam = baiLamCuaHocSinh.find(
          (baiLam) => baiLam.id === idBaiTapDienKhuyet
        );

        if (baiLam) {
          baiLam.content = content;
        } else {
          baiLamCuaHocSinh.push({
            type: "dienKhuyet",
            id: idBaiTapDienKhuyet,
            content: content,
          });
        }
      }

      state.hws = cloneHomeworks;
      state.updatingStore = false;
    },
    updateAnswersWriting(state, action) {
      state.updatingStore = true;
      const { idBaiTapVeNhaCon, idBaiTapViet, content } = action.payload;
      const cloneHomeworks = [...state.hws];

      for (let i = 0; i < cloneHomeworks.length; i++) {
        const baiTapVeNha = cloneHomeworks[i].baiTapVeNha;
        const baiTapCon = baiTapVeNha.find(
          (baiTap) => baiTap._id === idBaiTapVeNhaCon
        );
        if (!baiTapCon) continue;

        const baiLamCuaHocSinh = baiTapCon.baiLamCuaHocSinh;

        const baiLam = baiLamCuaHocSinh.find(
          (baiLam) => baiLam.id === idBaiTapViet
        );

        if (baiLam) {
          baiLam.content = content;
        } else {
          baiLamCuaHocSinh.push({
            type: "viet",
            id: idBaiTapViet,
            content: content,
          });
        }
      }

      state.hws = cloneHomeworks;
      state.updatingStore = false;
    },
    updateAnswersTrueFalse(state, action) {
      state.updatingStore = true;
      const cloneHomeworks = [...state.hws];
      const { idBaiTapVeNhaCon, content } = action.payload;

      for (let i = 0; i < cloneHomeworks.length; i++) {
        const baiTapVeNha = cloneHomeworks[i].baiTapVeNha;

        const baiTapVeNhaCon = baiTapVeNha.find(
          (baiTap) => baiTap._id === idBaiTapVeNhaCon
        );
        if (!baiTapVeNhaCon) continue;

        const baiLamCuaHocSinh = baiTapVeNhaCon.baiLamCuaHocSinh;

        if (baiLamCuaHocSinh.length === 0) {
          baiLamCuaHocSinh.push({
            id: content,
            content: content,
            type: "tracNghiem",
          });
        } else {
          baiLamCuaHocSinh[0].id = content;
          baiLamCuaHocSinh[0].content = content;
        }
      }

      state.hws = cloneHomeworks;
      state.updatingStore = false;
    },
    updateAnswersMatching(state, action) {
      state.updatingStore = true;

      const { idBaiTapVeNhaCon, baiLamCuaHocSinh } = action.payload;
      const cloneHomeworks = [...state.hws];

      for (let i = 0; i < cloneHomeworks.length; i++) {
        const baiTapVeNha = cloneHomeworks[i].baiTapVeNha;

        const baiTapVeNhaCon = baiTapVeNha.find(
          (baiTap) => baiTap._id === idBaiTapVeNhaCon
        );
        if (!baiTapVeNhaCon) continue;

        baiTapVeNhaCon.baiLamCuaHocSinh = baiLamCuaHocSinh;
      }

      state.hws = cloneHomeworks;
      state.updatingStore = false;
    },
  },
});

export const HwsActions = HwsSlice.actions;

export default HwsSlice;
