import { createSlice } from "@reduxjs/toolkit";

const initState = {
  hws: [],
  recentElementConfirmId: "",
  //TODO: sửa mục đích và logic cảu showStudentAnswers ở đây
  showStudentAnswers: true,
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
    showStudentAnswers(state) {
      state.showStudentAnswers = true;
    },
    hideStudentAnswers(state) {
      state.showStudentAnswers = false;
    },
    updateAnswersWriting(state, action) {
      const cloneHomeworks = [...state.hws];
      const { homeworkId, homeworkWrittingId, answer, scrollToElementId } =
        action.payload;

      for (let i = 0; i < cloneHomeworks.length; i++) {
        const currentHomework = cloneHomeworks[i];

        const writtingHomework = findSubHomework(
          currentHomework.baiTapVeNha,
          homeworkId
        );

        if (
          !validSubHomework(writtingHomework, "viet") ||
          Object.keys(writtingHomework).length === 0
        )
          continue;

        const studentWork = findStudentWork(
          writtingHomework.baiLamCuaHocSinh,
          homeworkWrittingId
        );

        if (Object.keys(studentWork).length === 0) {
          writtingHomework.baiLamCuaHocSinh.push({
            type: "viet",
            id: homeworkWrittingId,
            content: answer,
          });
        } else {
          studentWork.content = answer;
        }
        break;
      }

      state.hws = cloneHomeworks;
      state.recentElementConfirmId = scrollToElementId;
    },
    updateAnswersTrueFalse(state, action) {
      const cloneHomeworks = [...state.hws];
      const { homeworkId, homeworkTrueFalseId, answer, scrollToElementId } =
        action.payload;

      const homework = findMainHomework(cloneHomeworks, homeworkId);
      if (Object.keys(homework).length === 0) return;

      const trueFalseHomework = findSubHomework(
        homework.baiTapVeNha,
        homeworkTrueFalseId
      );
      if (Object.keys(trueFalseHomework).length === 0) return;

      if (trueFalseHomework.baiLamCuaHocSinh.length === 0) {
        trueFalseHomework.baiLamCuaHocSinh.push({
          type: "tracNghiem",
          id: answer,
          content: answer,
        });
      } else {
        const updatedObj = trueFalseHomework.baiLamCuaHocSinh[0];
        updatedObj.id = answer;
        updatedObj.content = answer;
      }

      state.hws = cloneHomeworks;
      state.recentElementConfirmId = scrollToElementId;
    },
    updateAnswersFillEmpty(state, action) {
      const cloneHomeworks = [...state.hws];
      const { homeworkId, homeworkFillEmptyId, answer, scrollToElementId } =
        action.payload;
      for (let i = 0; i < cloneHomeworks.length; i++) {
        const currentHomework = cloneHomeworks[i];

        const fillEmptyHomework = findSubHomework(
          currentHomework.baiTapVeNha,
          homeworkId
        );

        if (
          !validSubHomework(fillEmptyHomework, "dienKhuyet") ||
          Object.keys(fillEmptyHomework).length === 0
        )
          continue;

        const studentWork = findStudentWork(
          fillEmptyHomework.baiLamCuaHocSinh,
          homeworkFillEmptyId
        );

        if (Object.keys(studentWork).length === 0) {
          fillEmptyHomework.baiLamCuaHocSinh.push({
            type: "viet",
            id: homeworkFillEmptyId,
            content: answer,
          });
        } else {
          studentWork.content = answer;
        }
        break;
      }

      state.hws = cloneHomeworks;
      state.recentElementConfirmId = scrollToElementId;
    },
    updateAnswersMatching(state, action) {
      const cloneHomeworks = [...state.hws];
      const { idVeTrai, nhanChon, veTrai, scrollToElementId, homeworkId } =
        action.payload;

      for (let i = 0; i < cloneHomeworks.length; i++) {
        const currentHomework = cloneHomeworks[i];

        const curBaiTapVeNha = currentHomework.baiTapVeNha;
        //Tìm obj bài tập về nhà bên trong
        const targetBtvn = curBaiTapVeNha.find(
          (item) => item._id === homeworkId
        );

        if (targetBtvn) {
          //1. Việc lớn đầu tiên là tìm option của về trái và select nó tương ứng
          const curItemsTrai = targetBtvn.data.matching.datas.itemsTrai;
          const targetItemTrai = curItemsTrai.find(
            (item) => item.idVeTrai === idVeTrai
          );
          if (targetItemTrai) {
            targetItemTrai.options.forEach((item) => (item.isSelected = false));
            const curOption = targetItemTrai.options.find(
              (item) => item.nhan === nhanChon
            );
            if (curOption) curOption.isSelected = true;
          }
          //2. Việc lớn thứ 2 là update kết quả trả lời vào prop cauTraLoiCuaHocSinh
          //2.1.Dựa vào nhanChon, ta tìm trong itemsPhaiRandom hiện taị nó đang là giá trị gì
          const curItemsPhaiRandom =
            targetBtvn.data.matching.datas.itemsPhaiRandom;
          const targetItemPhai = curItemsPhaiRandom.find(
            (item) => item.nhan === nhanChon
          );
          const value = targetItemPhai.vePhai || "";
          //2.2. Giờ thì tìm trong prop baiLamCuaHocSinh để update / thêm mới
          const curBaiLamCuaHocSinh = [...targetBtvn.baiLamCuaHocSinh];
          if (curBaiLamCuaHocSinh.length === 0) {
            //2.3. Xử lý đẩy mới vào thôi
            curBaiLamCuaHocSinh.push({
              type: "matching",
              id: idVeTrai,
              content: value,
            });
          } else {
            //Tìm xem có tồn tại chưa thì lại xử lý if tiêp
            const existBaiLam = curBaiLamCuaHocSinh.find(
              (item) => item.id === idVeTrai
            );
            if (!existBaiLam) {
              curBaiLamCuaHocSinh.push({
                type: "matching",
                id: idVeTrai,
                content: value,
              });
            } else {
              existBaiLam.content = value;
            }
          } // end if
          targetBtvn.baiLamCuaHocSinh = curBaiLamCuaHocSinh;
        }
      }
      state.hws = cloneHomeworks;
      state.recentElementConfirmId = scrollToElementId;
    },
    scrollToSubmitErrorMessage(state) {
      state.recentElementConfirmId = "local-submit-homework-error-message";
    },
  },
});

const findMainHomework = (homeworks, homeworkId) => {
  let result = {};
  if (!homeworks || homeworks.length === 0 || !homeworkId) return result;
  const mainHomework = homeworks.find((hw) => hw._id === homeworkId);
  if (mainHomework) result = mainHomework;
  return result;
};
const findSubHomework = (baiTapVeNha, homeworkTypeId) => {
  let result = {};
  if (!baiTapVeNha || baiTapVeNha.length === 0 || !homeworkTypeId)
    return result;
  const subHomework = baiTapVeNha.find((btvn) => btvn._id === homeworkTypeId);
  if (subHomework) result = subHomework;
  return result;
};
const validSubHomework = (homework, type) => {
  if (!homework || !type) return false;
  return homework.data[type].active;
};
const findStudentWork = (baiLamCuaHocSinh, homeworkTypeId) => {
  let result = {};
  if (!baiLamCuaHocSinh || baiLamCuaHocSinh.length === 0 || !homeworkTypeId)
    return result;
  const targetBaiLamCuaHocSinh = baiLamCuaHocSinh.find(
    (btvn) => btvn.id === homeworkTypeId
  );
  if (targetBaiLamCuaHocSinh) result = targetBaiLamCuaHocSinh;
  return result;
};

export const HwsActions = HwsSlice.actions;

export default HwsSlice;
