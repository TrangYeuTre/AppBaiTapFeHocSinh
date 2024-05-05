import HomeworkStack, {
  HomeworkStackFillEmpty,
  HomeworkStackMatching,
  HomeworkStackWritting,
} from "./HomeworkStack";

export default class HomeworksStack {
  constructor({ homeworks = [], amountHomeworks = 0, loadOrdinalNubmer = 1 }) {
    this.homeworks = homeworks;
    this.amountHomeworks = amountHomeworks;
    this.loadOrdinalNubmer = loadOrdinalNubmer;
  }
  getCoreData() {
    const convertedHomeworks = this.homeworks.map((hw) =>
      Object.assign({}, hw)
    );
    return {
      homeworks: convertedHomeworks,
      amountHomeworks: this.amountHomeworks,
      loadOrdinalNubmer: this.loadOrdinalNubmer,
    };
  }
  createInitHomeworksRender(loadedHomeworks) {
    // console.log("--- bulild chuyển hóa đây");
    // console.log(this.homeworks);

    if (!loadedHomeworks || loadedHomeworks.length === 0) return this;

    for (let i = 0; i < loadedHomeworks.length; i++) {
      const homework = loadedHomeworks[i];
      const baiTapVeNha = homework.baiTapVeNha;
      if (!baiTapVeNha || baiTapVeNha.length === 0) continue;

      const standardType = ["viet", "matching", "dienKhuyet", "tracNghiem"];

      for (let j = 0; j < baiTapVeNha.length; j++) {
        const baiTapVeNhaCon = baiTapVeNha[j];
        const kieuBaiTapVeNhaCon = standardType.find(
          (type) => baiTapVeNhaCon.data[type].active
        );
        console.log(kieuBaiTapVeNhaCon);

        // if (kieuBaiTapVeNhaCon === "viet") {
        //   const arrResult = this.#collectWrittingDatas(baiTapVeNhaCon);
        //   this.homeworks = [...this.homeworks, ...arrResult];
        // }
        // if (kieuBaiTapVeNhaCon === "matching") {
        //   const objResult = this.#collectMatchingData(baiTapVeNhaCon);
        //   this.homeworks.push(objResult);
        // }
        if (kieuBaiTapVeNhaCon === "dienKhuyet") {
          const arrResult = this.#collectFillEmptyData(baiTapVeNhaCon);
          this.homeworks = [...this.homeworks, ...arrResult];
        }
        // if (kieuBaiTapVeNhaCon === "tracNghiem") {
        //   const objResult = this.#collectTrueFalseData(baiTapVeNhaCon);
        //   this.homeworks.push(objResult);
        // }
      }
    }

    // this.#randomHomeworks();
    this.#makeOrdinalNumbers();

    this.#calcAmountHomeworks();

    // console.log("--- bài tập về nhà thành phẩm nè");
    // console.log(this.homeworks);

    return this;
  }
  #collectWrittingDatas(baiTapVeNhaCon) {
    let arrResult = [];
    baiTapVeNhaCon.data.viet.datas.forEach((data) => {
      const writtingHomework = new HomeworkStackWritting(
        baiTapVeNhaCon._id,
        null,
        baiTapVeNhaCon.data.nguoiSuaBaiTap,
        baiTapVeNhaCon.end,
        baiTapVeNhaCon.ketQua,
        baiTapVeNhaCon.soLanNop,
        {
          deBai: baiTapVeNhaCon.data.deBai,
          imageUrl: data.imageUrl,
          tinhTrang: baiTapVeNhaCon.tinhTrang,
        },
        "viet",
        data.id
      );
      arrResult.push(writtingHomework);
    });
    return arrResult;
  }
  #collectFillEmptyData(baiTapVeNhaCon) {
    let arrResult = [];
    baiTapVeNhaCon.data.dienKhuyet.datas.forEach((data) => {
      const fillEmpty = new HomeworkStackFillEmpty(
        baiTapVeNhaCon._id,
        null,
        baiTapVeNhaCon.data.nguoiSuaBaiTap,
        baiTapVeNhaCon.end,
        baiTapVeNhaCon.ketQua,
        baiTapVeNhaCon.soLanNop,
        {
          deBai: baiTapVeNhaCon.data.deBai,
          imageUrl: data.imageUrl,
          tinhTrang: baiTapVeNhaCon.tinhTrang,
          kieu: data.kieu,
          ve1: data.ve1,
          ve2: data.ve2,
        },
        "dienKhuyet",
        data.id
      );
      arrResult.push(fillEmpty);
    });
    return arrResult;
  }
  #collectMatchingData(baiTapVeNhaCon) {
    const matching = new HomeworkStackMatching(
      baiTapVeNhaCon._id,
      null,
      baiTapVeNhaCon.data.nguoiSuaBaiTap,
      baiTapVeNhaCon.end,
      baiTapVeNhaCon.ketQua,
      baiTapVeNhaCon.soLanNop,
      {
        deBai: baiTapVeNhaCon.data.deBai,
        tinhTrang: baiTapVeNhaCon.tinhTrang,
        itemsPhai: baiTapVeNhaCon.data.matching.datas.itemsPhai,
        itemsTrai: baiTapVeNhaCon.data.matching.datas.itemsTrai,
        itemsPhaiRandom: baiTapVeNhaCon.data.matching.datas.itemsPhaiRandom,
      },
      "matching"
    );
    return matching;
  }
  #collectTrueFalseData(baiTapVeNhaCon) {
    const matching = new HomeworkStackMatching(
      baiTapVeNhaCon._id,
      null,
      baiTapVeNhaCon.data.nguoiSuaBaiTap,
      baiTapVeNhaCon.end,
      baiTapVeNhaCon.ketQua,
      baiTapVeNhaCon.soLanNop,
      {
        deBai: baiTapVeNhaCon.data.deBai,
        tinhTrang: baiTapVeNhaCon.tinhTrang,
        options: baiTapVeNhaCon.data.tracNghiem.datas,
      },
      "tracNghiem"
    );
    return matching;
  }
  #randomHomeworks() {
    const randomHomeworks = this.#randomItemsInArray(this.homeworks);
    this.homeworks = randomHomeworks;
    return this;
  }
  #randomItemsInArray(array) {
    // Hàm so sánh ngẫu nhiên
    function randomComparator() {
      return Math.random() - 0.5; // Trả về một số ngẫu nhiên dương hoặc âm
    }
    // Sử dụng phương thức sort() với hàm so sánh ngẫu nhiên
    return array.sort(randomComparator);
  }
  #makeOrdinalNumbers() {
    let count = 1;
    for (let i = 0; i < this.homeworks.length; i++) {
      this.homeworks[i].ordinalNumber = count;
      count++;
    }
    return this;
  }
  #calcAmountHomeworks() {
    this.amountHomeworks = this.homeworks.length;
    return this;
  }
}
