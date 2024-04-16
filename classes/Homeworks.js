import { isValidImageUrl, devErrorMessage } from "../helper/uti";

export default class Homeworks {
  constructor(homeworks) {
    this.homeworks = homeworks;
  }
  //Mỗi item trong hws là một obj homework
  //Ta cần lấy prop baiTapVeNha trong từng obj để render thôi
  getBaiTapVeNhaRender() {
    const baiTapVeNhaRender = [];
    if (this.homeworks && this.homeworks.length > 0) {
      this.homeworks.forEach((homework) => {
        homework.baiTapVeNha.forEach((i) =>
          baiTapVeNhaRender.push({
            ...i,
            baiTapLonId: homework._id,
            soLanNop: i.soLanNop,
          })
        );
      });
    }
    return baiTapVeNhaRender;
  }
  //CỤM KIỂM TRA FORM ĐỦ ĐK SUBMIT KHÔNG
  validSubmit() {
    const result = { valid: true, message: "" };

    if (!this.homeworks || this.homeworks.length == 0) {
      result.valid = false;
      result.message = "Không có bài tập được giao nào";
      return result;
    }

    const conditions = this.#doAllHomeworks();
    const limitedSubmitAllHomeworks = this.#limitSubmitAllHomeworks();
    const gradedAllHomeworks = this.#gradedAllHomeworks();

    if (!conditions.doAllTrueFalse) {
      result.valid = false;
      result.message = "Làm thiếu bài tập dạng trắc nghiệm.";
    }
    if (!conditions.doAllFillEmpty) {
      result.valid = false;
      result.message = "Làm thiếu bài tập dạng điền khuyết.";
    }
    if (!conditions.doAllWritting) {
      result.valid = false;
      result.message = "Làm thiếu bài tập dạng viết.";
    }
    if (!conditions.doAllMatching) {
      result.valid = false;
      result.message = "Làm thiếu bài tập dạng matching.";
    }
    if (limitedSubmitAllHomeworks) {
      result.valid = false;
      result.message = "Tất cả các bài tập đã hết số lần nộp.";
    }
    if (gradedAllHomeworks) {
      result.valid = false;
      result.message = "Tất cả bài tập đã được giáo viên chấm điểm.";
    }
    return result;
  }
  #doAllHomeworks() {
    const conditions = {
      doAllTrueFalse: true,
      doAllFillEmpty: true,
      doAllWritting: true,
      doAllMatching: true,
    };
    this.homeworks.forEach((homework) => {
      homework.baiTapVeNha.forEach((btvn) => {
        this.#doAllTrueFalse({ btvn, conditions });
        this.#doAllFillEmpty({ btvn, conditions });
        this.#doAllWritting({ btvn, conditions });
        this.#doAllMatching({ btvn, conditions });
      });
    });
    return conditions;
  }
  #limitSubmitAllHomeworks() {
    let limitedSubmitAllHomeworks = true;
    this.homeworks.forEach((homework) => {
      homework.baiTapVeNha.forEach((btvn) => {
        if (+btvn.soLanNop < 3) limitedSubmitAllHomeworks = false;
      });
    });
    return limitedSubmitAllHomeworks;
  }
  #gradedAllHomeworks() {
    let gradedAllHomews = true;
    this.homeworks.forEach((homework) => {
      homework.baiTapVeNha.forEach((btvn) => {
        if (btvn.tinhTrang !== "Đã sửa") gradedAllHomews = false;
      });
    });
    return gradedAllHomews;
  }
  #doAllTrueFalse({ btvn, conditions }) {
    if (btvn.data.tracNghiem.active) {
      if (btvn.baiLamCuaHocSinh.length === 0) conditions.doAllTrueFalse = false;
    }
  }
  #doAllFillEmpty({ btvn, conditions }) {
    if (btvn.data.dienKhuyet.active) {
      const amountStudentWorks = +btvn.baiLamCuaHocSinh.length || 0;
      const totalFillEmptyHomeworks = +btvn.data.dienKhuyet.datas.length || 0;
      if (btvn.baiLamCuaHocSinh.length === 0) {
        conditions.doAllFillEmpty = false;
      } else {
        btvn.baiLamCuaHocSinh.forEach((baiLam) => {
          if (!baiLam.content) conditions.doAllFillEmpty = false;
        });
      }
      if (amountStudentWorks !== totalFillEmptyHomeworks) {
        conditions.doAllFillEmpty = false;
      }
    }
  }
  #doAllWritting({ btvn, conditions }) {
    if (btvn.data.viet.active) {
      const amountStudentWorks = +btvn.baiLamCuaHocSinh.length || 0;
      const totalWrittingHomeworks = +btvn.data.viet.datas.length || 0;
      if (btvn.baiLamCuaHocSinh.length === 0) {
        conditions.doAllWritting = false;
      } else {
        btvn.baiLamCuaHocSinh.forEach((baiLam) => {
          if (!baiLam.content) conditions.doAllWritting = false;
        });
      }
      if (amountStudentWorks !== totalWrittingHomeworks) {
        conditions.doAllWritting = false;
      }
    }
  }
  #doAllMatching({ btvn, conditions }) {
    if (btvn.data.matching.active) {
      const matchingPairs = btvn.data.matching.datas.itemsTrai.length || 0;
      const doAmounts = btvn.baiLamCuaHocSinh.length || 0;
      if (doAmounts < matchingPairs) conditions.doAllMatching = false;
    }
  }
  findHomeworkById(id) {
    if (!id || this.homeworks.length === 0) {
      devErrorMessage("Không tìm thấy bài tập chính về nhà theo id.");
      return;
    }
    const homework = this.homeworks[0].baiTapVeNha.find(
      (homework) => homework._id === id
    );
    return homework;
  }
  findSubHomeworkWrittingById(id) {
    if (!id || this.homeworks.length === 0) {
      devErrorMessage("Không tìm thấy bài tập con về nhà theo id.");
      return;
    }
    const writtingHomeworks = this.homeworks[0].baiTapVeNha.filter(
      (homework) => homework.data.viet.active
    );
    let result = {};
    writtingHomeworks.forEach((writtingHomework) => {
      const targetWrittingHomework = writtingHomework.data.viet.datas.find(
        (item) => item.id === id
      );
      if (targetWrittingHomework) result = targetWrittingHomework;
    });
    return result;
  }
  getHomeworkType(homework) {
    if (!homework) {
      devErrorMessage("Lấy kiểu bài tập lỗi, bài tập không tồn tại.");
      return;
    }
    let type = "";
    if (homework.data.tracNghiem.active) type = "tracNghiem";
    if (homework.data.dienKhuyet.active) type = "dienKhuyet";
    if (homework.data.viet.active) type = "viet";
    if (homework.data.matching.active) type = "matching";
    if (type === "") {
      devErrorMessage("Kiểu bài tập rỗng, không hợp lệ.");
    }
    return type;
  }
  getHomeworkTypeDatas(homework, type) {
    if (!homework || !type) {
      devErrorMessage("Lấy datas theo kiểu bài tập lỗi.");
      return;
    }
    let datas = [];
    if (homework.data && homework.data[type] && homework.data[type].datas) {
      datas = homework.data[type].datas;
    }
    return datas;
  }
  //TYPE WRITTING
  convertHomeworkWrittingDatasToRender({
    writtingDatas,
    baiLamCuaHocSinh,
    soLanNop,
    tinhTrang,
  }) {
    if (!writtingDatas || !baiLamCuaHocSinh || !tinhTrang) {
      devErrorMessage(
        "Lỗi chuyển hóa bài tập dạng viết thành datas render: inputs không hợp lệ"
      );
      return;
    }
    if (writtingDatas.length === 0) {
      devErrorMessage(
        "writtingDatas ban đầu rỗng, không có data để render bài tập dạng viết."
      );
      return [];
    }

    this.#initCreateHomeworkWrittingRender({
      writtingDatas,
      soLanNop,
      tinhTrang,
    });
    this.#checkHomeworkWrittingDatasImage();
    this.#fillHomeworkWrittingWithStudentWork(baiLamCuaHocSinh);
    return this.homeworkWrittingRender;
  }
  #initCreateHomeworkWrittingRender({ writtingDatas, soLanNop, tinhTrang }) {
    const initHomeworkWrittingRender = writtingDatas.map((writtingData) => {
      return {
        id: writtingData.id,
        content: "",
        imageUrl: writtingData.imageUrl,
        blockContent: +soLanNop >= 3 || tinhTrang === "Đã sửa",
      };
    });
    this.homeworkWrittingRender = initHomeworkWrittingRender;
  }
  #checkHomeworkWrittingDatasImage() {
    this.#checkHomeworkGeneralDatasImage(this.homeworkWrittingRender);
  }
  #fillHomeworkWrittingWithStudentWork(baiLamCuaHocSinh) {
    this.#fillHomeworkGeneralWithStudentWork(
      this.homeworkWrittingRender,
      baiLamCuaHocSinh
    );
  }
  // TYPE FILL EMPTY
  convertHomeworkFillEmptyDatasToRender({
    fillEmptyDatas,
    baiLamCuaHocSinh,
    dapAnCuaGiaoVien,
    soLanNop,
    tinhTrang,
  }) {
    if (
      !fillEmptyDatas ||
      !baiLamCuaHocSinh ||
      !tinhTrang ||
      !dapAnCuaGiaoVien
    ) {
      devErrorMessage(
        "Lỗi chuyển hóa bài tập dạng điền khuyết thành datas render: inputs không hợp lệ"
      );
      return;
    }
    if (fillEmptyDatas.length === 0) {
      devErrorMessage(
        "fillEmptyDatas ban đầu rỗng, không có data để render bài tập dạng điền khuyết."
      );
      return [];
    }

    this.#initCreateHomeworkFillEmptyRender({
      fillEmptyDatas,
      soLanNop,
      tinhTrang,
    });
    this.#checkHomeworkFillEmptyDatasImage();
    this.#fillHomeworkEmptyWithStudentWork(baiLamCuaHocSinh);
    this.#fillHomeworkEmptyWithTeacherGrading(dapAnCuaGiaoVien);
    return this.homeworkFillEmptyRender;
  }
  #initCreateHomeworkFillEmptyRender({ fillEmptyDatas, soLanNop, tinhTrang }) {
    const initHomeworkFilEmptyRender = fillEmptyDatas.map((fillEmptyData) => {
      return {
        id: fillEmptyData.id,
        kieu: fillEmptyData.kieu, //đk đầu, giữa, cuối
        imageUrl: fillEmptyData.imageUrl,
        content: "",
        ve1: fillEmptyData.ve1 || "",
        ve2: fillEmptyData.ve2 || "",
        blockContent: +soLanNop >= 3 || tinhTrang === "Đã sửa",
        dapAnCuaGiaoVien: "",
        dat: false,
      };
    });
    this.homeworkFillEmptyRender = initHomeworkFilEmptyRender;
  }
  #checkHomeworkFillEmptyDatasImage() {
    this.#checkHomeworkGeneralDatasImage(this.homeworkFillEmptyRender);
  }
  #fillHomeworkEmptyWithStudentWork(baiLamCuaHocSinh) {
    this.#fillHomeworkGeneralWithStudentWork(
      this.homeworkFillEmptyRender,
      baiLamCuaHocSinh
    );
  }
  #fillHomeworkEmptyWithTeacherGrading(dapAnCuaGiaoVien) {
    if (!dapAnCuaGiaoVien || dapAnCuaGiaoVien.length === 0) {
      devErrorMessage(
        "Chưa có bài sửa của giáo viên để xử lý thêm vào bài tập về nhà render."
      );
      return;
    }
    dapAnCuaGiaoVien.forEach((dapAn) => {
      if (dapAn.hasOwnProperty("id") && dapAn.hasOwnProperty("content")) {
        const { id: fillEmptyHomeworkId, content } = dapAn;
        if (
          content.hasOwnProperty("nhanXetCuaGiaoVien") &&
          content.hasOwnProperty("ketQua")
        ) {
          const { nhanXetCuaGiaoVien, ketQua } = content;
          const fillEmptyHomework = this.homeworkFillEmptyRender.find(
            (item) => item.id === fillEmptyHomeworkId
          );
          if (fillEmptyHomework) {
            fillEmptyHomework.dat = ketQua;
            fillEmptyHomework.dapAnCuaGiaoVien = nhanXetCuaGiaoVien;
          }
        }
      }
    });
  }
  //TYPE TRUE/FALSE
  convertHomeworkTrueFalseDatasToRender({ trueFalseDatas, baiLamCuaHocSinh }) {
    if (!trueFalseDatas || !baiLamCuaHocSinh) {
      devErrorMessage(
        "Lỗi chuyển hóa bài tập dạng viết thành datas render: inputs không hợp lệ"
      );
      return;
    }
    if (trueFalseDatas.length === 0) {
      devErrorMessage(
        "trueFalseDatas ban đầu rỗng, không có data để render bài tập dạng trắc nghiệm."
      );
      return [];
    }
    this.#initCreateHomeworkTrueFalseOptions(trueFalseDatas);
    this.#fillHomeworkTrueFalseWithStudentWork(baiLamCuaHocSinh);
    return this.homeworkTrueFalseRender;
  }
  #initCreateHomeworkTrueFalseOptions(trueFalseDatas) {
    const initTrueFalseOptions = trueFalseDatas.map((trueFalseData) => {
      return {
        id: trueFalseData.id,
        content: trueFalseData.content,
        isSelected: false,
      };
    });
    this.homeworkTrueFalseRender = initTrueFalseOptions;
  }
  #fillHomeworkTrueFalseWithStudentWork(baiLamCuaHocSinh) {
    if (!baiLamCuaHocSinh || baiLamCuaHocSinh.length === 0) {
      devErrorMessage(
        "Chưa có bài làm của học sinh để chuyển hóa vào bài tập về nhà render."
      );
      return;
    }
    const chosenOptionOfStudent = baiLamCuaHocSinh[0].id || "";
    const targetOption = this.homeworkTrueFalseRender.find(
      (item) => item.id === chosenOptionOfStudent
    );
    if (targetOption) {
      this.homeworkTrueFalseRender.forEach((item) => (item.isSelected = false));
      targetOption.isSelected = true;
    }
  }

  //TYPE MATCHING
  convertHomeworkMatchingToRender({ matchingDatas, baiLamCuaHocSinh }) {
    if (!matchingDatas || !baiLamCuaHocSinh) {
      devErrorMessage(
        "Lỗi chuyển hóa bài tập dạng matching thành datas render: inputs không hợp lệ"
      );
      return;
    }
    if (matchingDatas.length === 0) {
      devErrorMessage(
        "matchingDatas ban đầu rỗng, không có data để render bài tập dạng trắc nghiệm."
      );
      return {};
    }
    if (
      matchingDatas.hasOwnProperty("itemsTrai") &&
      matchingDatas.hasOwnProperty("itemsPhai") &&
      matchingDatas.hasOwnProperty("itemsPhaiRandom")
    ) {
      const { itemsTrai, itemsPhai, itemsPhaiRandom } = matchingDatas;
      const itemsTraiWithStudentWork =
        this.#fillHomeworkMatchingWithStudentWork({
          baiLamCuaHocSinh,
          itemsTrai,
          itemsPhaiRandom,
        });
      return { itemsTraiWithStudentWork, itemsPhaiRandom };
    }
  }
  #fillHomeworkMatchingWithStudentWork({
    baiLamCuaHocSinh,
    itemsTrai,
    itemsPhaiRandom,
  }) {
    const cloneItemsTrai = [...JSON.parse(JSON.stringify(itemsTrai))];

    if (baiLamCuaHocSinh.length === 0) {
      devErrorMessage(
        "Chưa có bài làm matching của học sinh để fill vào bài tập về nhà render."
      );
      return cloneItemsTrai;
    }

    baiLamCuaHocSinh.forEach((item) => {
      const { id: idVeTrai, content } = item;
      let targetNhan = "";

      //1.Từ content tra trong itemsPhaiRandom để tìm nhãn
      const targetIpRandom = itemsPhaiRandom.find(
        (ip) => ip.vePhai === content
      );
      if (targetIpRandom) targetNhan = targetIpRandom.nhan;
      //2. Có nhãn rồi thì tim trong vế trái item tương ứng để kích hoạch
      const targetIt = cloneItemsTrai.find((it) => it.idVeTrai === idVeTrai);
      if (targetIt) {
        const cloneOptions = JSON.parse(JSON.stringify(targetIt.options));
        cloneOptions.forEach((opt) => (opt.isSelected = false));
        const targetOpt = cloneOptions.find((opt) => opt.nhan === targetNhan);
        if (targetOpt) targetOpt.isSelected = true;
        targetIt.options = cloneOptions;
      }
    });

    return cloneItemsTrai;
  }

  //GENERAL FUNCTIONS
  #checkHomeworkGeneralDatasImage(homeworkTypeRender) {
    if (!homeworkTypeRender || homeworkTypeRender.length === 0) {
      devErrorMessage(
        "Lỗi kiểm tra url hình của bài tập: input homeworks không hợp lệ."
      );
      return;
    }
    homeworkTypeRender.forEach((homework) => {
      const validImage = isValidImageUrl(homework.imageUrl);
      if (!validImage) homework.imageUrl = "/assets/404-error.png";
    });
  }
  #fillHomeworkGeneralWithStudentWork(homeworkTypeRender, baiLamCuaHocSinh) {
    if (
      !baiLamCuaHocSinh ||
      baiLamCuaHocSinh.length === 0 ||
      !homeworkTypeRender ||
      homeworkTypeRender.length === 0
    ) {
      devErrorMessage(
        "Lỗi điền bài làm của học sinh vào bài tập render: inputs không hợp lệ."
      );
      return;
    }
    baiLamCuaHocSinh.forEach((baiLam) => {
      const targetHomework = homeworkTypeRender.find(
        (homework) => homework.id === baiLam.id
      );
      if (targetHomework) targetHomework.content = baiLam.content;
    });
  }
}
