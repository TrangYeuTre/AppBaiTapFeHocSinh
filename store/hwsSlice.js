import { createSlice } from "@reduxjs/toolkit";

const initState = {
  hws: [],
  updatingStore: false,
  //TODO: ổn rồi thì xóa nè
  // showStudentAnswers: true,
  // recentElementConfirmId: "",
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
          console.log("cập nhật nè");
        } else {
          baiLamCuaHocSinh.push({
            type: "dienKhuyet",
            id: idBaiTapDienKhuyet,
            content: content,
          });
          console.log("Thêm mới nè");
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

    // //TODO: ổn rồi thì xóa nè
    // scrollToSubmitErrorMessage(state) {
    //   state.recentElementConfirmId = "local-submit-homework-error-message";
    // },
    // stopUpdatingStore(state) {
    //   state.updatingStore = false;
    // },
  },
});

// const findMainHomework = (homeworks, homeworkId) => {
//   let result = {};
//   if (!homeworks || homeworks.length === 0 || !homeworkId) return result;
//   const mainHomework = homeworks.find((hw) => hw._id === homeworkId);
//   if (mainHomework) result = mainHomework;
//   return result;
// };
// const findSubHomework = (baiTapVeNha, homeworkTypeId) => {
//   let result = {};
//   if (!baiTapVeNha || baiTapVeNha.length === 0 || !homeworkTypeId)
//     return result;
//   const subHomework = baiTapVeNha.find((btvn) => btvn._id === homeworkTypeId);
//   if (subHomework) result = subHomework;
//   return result;
// };
// const validSubHomework = (homework, type) => {
//   if (!homework || !type) return false;
//   return homework.data[type].active;
// };
// const findStudentWork = (baiLamCuaHocSinh, homeworkTypeId) => {
//   let result = {};
//   if (!baiLamCuaHocSinh || baiLamCuaHocSinh.length === 0 || !homeworkTypeId)
//     return result;
//   const targetBaiLamCuaHocSinh = baiLamCuaHocSinh.find(
//     (btvn) => btvn.id === homeworkTypeId
//   );
//   if (targetBaiLamCuaHocSinh) result = targetBaiLamCuaHocSinh;
//   return result;
// };

export const HwsActions = HwsSlice.actions;

export default HwsSlice;
