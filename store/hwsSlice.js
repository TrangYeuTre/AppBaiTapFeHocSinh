import { createSlice } from "@reduxjs/toolkit";

//recentElementConfirmId lưu tạm id gần nhất của bài tập được bấm xác nhận để
// dùng scroll đến đó khi load lại hws
const initState = { hws: [], recentElementConfirmId: "" };

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
    updateAnswersWriting(state, action) {
      const clone = [...state.hws];
      const { idObjBaiTap, idBaiTapCon, cauTraLoi } = action.payload;
      //Loop for để tìm thôi: array - array (baiTapVeNha) - target
      for (let i = 0; i < clone.length; i++) {
        const curObj = clone[i];
        const curBtvn = curObj.baiTapVeNha;
        const target = curBtvn.find((item) => item._id === idObjBaiTap);
        if (target && target.data.viet.active) {
          //Thêm mới hoặc update phần bài làm của học sinh vào prop baiLamCuaHocSinh
          const curBaiLamCuaHocSinh = target.baiLamCuaHocSinh;
          const subTarget = curBaiLamCuaHocSinh.find(
            (item) => item.id === idBaiTapCon
          );
          if (!subTarget) {
            //Thêm mới
            curBaiLamCuaHocSinh.push({
              type: "viet",
              id: idBaiTapCon,
              content: cauTraLoi,
            });
          } else {
            //Update
            subTarget.content = cauTraLoi;
          }
          break;
        }
      }
      state.hws = clone;
      state.recentElementConfirmId = idBaiTapCon;
    },
    updateAnswersTrueFalse(state, action) {
      const clone = [...state.hws];
      const { idObjBaiTap, cauTraLoi, idBaiTapCon } = action.payload;

      //1.tìm prop baiLamCuaHocSinh
      const objBaiTapTracNghiem = clone.find(
        (item) => item._id === idObjBaiTap
      );
      if (!objBaiTapTracNghiem) return;

      const curBaiTapVeNha = objBaiTapTracNghiem.baiTapVeNha;
      const targetBaiTapVeNha = curBaiTapVeNha.find(
        (item) => item._id === idBaiTapCon
      );
      if (!targetBaiTapVeNha) return;

      const curBaiLamCuaHocSinh = targetBaiTapVeNha.baiLamCuaHocSinh;

      //2.TÌm ra rồi, giờ xử lý update
      if (curBaiLamCuaHocSinh.length === 0) {
        curBaiLamCuaHocSinh.push({
          type: "tracNghiem",
          id: cauTraLoi,
          content: cauTraLoi,
        });
      } else {
        //Vì trong mảng chỉ chứa 1 obj trả lời câu trắc nghiệm nên không cần xử lý tìm
        const updatedObj = curBaiLamCuaHocSinh[0];
        updatedObj.id = cauTraLoi;
        updatedObj.content = cauTraLoi;
      }

      //Trả hàng thôi
      state.hws = clone;
      state.recentElementConfirmId = `trac-nghiem-${idObjBaiTap}`;

      // console.log(idObjBaiTap);
      // console.log(idBaiTapCon);
      // console.log(objBaiTapTracNghiem);
    },
    updateAnswersFillEmpty(state, action) {
      const clone = [...state.hws];
      const { idObjBaiTap, idBaiTapCon, cauTraLoi } = action.payload;
      //Loop for để tìm thôi: array - array (baiTapVeNha) - target
      for (let i = 0; i < clone.length; i++) {
        const curObj = clone[i];
        const curBtvn = curObj.baiTapVeNha;
        const target = curBtvn.find((item) => item._id === idObjBaiTap);
        if (target && target.data.dienKhuyet.active) {
          //Thêm mới hoặc update phần bài làm của học sinh vào prop baiLamCuaHocSinh
          const curBaiLamCuaHocSinh = target.baiLamCuaHocSinh;
          const subTarget = curBaiLamCuaHocSinh.find(
            (item) => item.id === idBaiTapCon
          );
          if (!subTarget) {
            //Thêm mới
            curBaiLamCuaHocSinh.push({
              type: "dienKhuyet",
              id: idBaiTapCon,
              content: cauTraLoi,
            });
          } else {
            //Update
            subTarget.content = cauTraLoi;
          }
          break;
        }
      }
      state.hws = clone;
      state.recentElementConfirmId = idBaiTapCon;
    },
    updateAnswersMatching(state, action) {
      const clone = [...state.hws];
      const { idVeTrai, nhanChon, veTrai, targetId, idObjBtvn } =
        action.payload;
      // console.log("---dữ liệu submit lên matching");
      // console.log(idVeTrai, nhanChon, veTrai, targetId, idObjBtvn);
      for (let i = 0; i < clone.length; i++) {
        const curObj = clone[i];
        const curBaiTapVeNha = curObj.baiTapVeNha;
        //Tìm obj bài tập về nhà bên trong
        const targetBtvn = curBaiTapVeNha.find(
          (item) => item._id === idObjBtvn
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
            console.log("Bài làm rống, đẩy mới vào thành công");
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
              console.log("Bài làm có, đẩy mới vào thành công");
            } else {
              existBaiLam.content = value;
              console.log("Bài làm có, cập nhật thành công");
            }
          } // end if
          targetBtvn.baiLamCuaHocSinh = curBaiLamCuaHocSinh;
        }
      }
      state.hws = clone;
      state.recentElementConfirmId = targetId;
    },
    // initFillAnswersMatching(state, action) {
    //   const { idObjBtvn } = action.payload;
    //   const clone = [...state.hws];
    //   for (let i = 0; i < clone.length; i++) {
    //     const curObj = clone[i];
    //     const curBaiTapVeNha = curObj.baiTapVeNha;
    //     //Tìm obj bài tập về nhà bên trong
    //     const targetBtvn = curBaiTapVeNha.find(
    //       (item) => item._id === idObjBtvn
    //     );
    //     if (targetBtvn) {
    //       const curBaiLamCuaHocSinh = targetBtvn.baiLamCuaHocSinh;
    //       const curItemsTrai = targetBtvn.data.matching.datas.itemsTrai;
    //       const curItemsPhaiRandom =
    //         targetBtvn.data.matching.datas.itemsPhaiRandom;
    //       if (curBaiLamCuaHocSinh.length === 0) return;
    //       curBaiLamCuaHocSinh.forEach((baiLam) => {
    //         const { id: idVeTrai, content } = baiLam;
    //         let targetNhan = "";
    //         //1. Từ content, tìm troang phaiRandom label tương ứng
    //         const targetItemPhaiRandom = curItemsPhaiRandom.find(
    //           (ip) => ip.vePhai === content
    //         );
    //         if (targetItemPhaiRandom) targetNhan = targetItemPhaiRandom.nhan;
    //         //2. Có nhẫn rồi thì ta select tương ứng trong itemsTrai
    //         const targetItemTrai = curItemsTrai.find(
    //           (it) => it.idVeTrai === idVeTrai
    //         );
    //         if (targetItemTrai) {
    //           targetItemTrai.options.forEach((opt) => (opt.isSelected = false));
    //           const targetOpt = targetItemTrai.options.find(
    //             (opt) => opt.nhan === targetNhan
    //           );
    //           if (targetOpt) targetOpt.isSelected = true;
    //         }
    //       });
    //     }
    //   }
    // },
  },
});

export const HwsActions = HwsSlice.actions;

export default HwsSlice;
