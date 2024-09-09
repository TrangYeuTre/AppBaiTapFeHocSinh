import ImageLoader from "./ImageLoader";
export class ClassifyExercise {
  //Thằng _id dùng để mark nếu làm sai -> dùng để load bài tập làm lại về sau
  constructor(_id, ordinal, deBai, imageUrl, cauHoi) {
    this._id = _id;
    this.ordinal = ordinal;
    this.deBai = deBai;
    this.imageUrl = imageUrl;
    this.cauHoi = cauHoi;
  }
  //Cb clear input và focus đầu vào
  initClearAndFocusInput(elementInputId) {
    const inputEle = document.getElementById(elementInputId);
    if (inputEle) {
      inputEle.value = "";
      inputEle.focus();
    }
  }
}

export class DienKhuyetExercise extends ClassifyExercise {
  constructor({ _id, ordinal, deBai, cauHoi, renderData }) {
    super(_id, ordinal, deBai, cauHoi);
    this.cauHoi = cauHoi;
    this.inputId = renderData.id;
    //Ngay khi khởi tạo class, lấy obj renderData đẻ xử lý lấy ra những thứ cần
    this.imageUrl = renderData.imageUrl;
    //Xử lý nội dung câu hỏi tùy theo dạng điền khuyết
    let noiDungBaiTap;
    if (renderData.kieu === "Điền khuyết đầu") {
      noiDungBaiTap = (
        <div className="fill-empty-option">
          <input
            id={`input-dk-${renderData.id}`}
            className="card-homework-input"
            type="text"
            required
            placeholder="Nhập đáp án..."
            minLength={1}
          />
          <p>{renderData.ve1}</p>
        </div>
      );
    }
    if (renderData.kieu === "Điền khuyết cuối") {
      noiDungBaiTap = (
        <div className="fill-empty-option">
          <p>{renderData.ve1}</p>
          <input
            id={`input-dk-${renderData.id}`}
            className="card-homework-input"
            type="text"
            required
            placeholder="Nhập đáp án..."
            minLength={1}
          />
        </div>
      );
    }
    if (renderData.kieu === "Điền khuyết giữa") {
      noiDungBaiTap = (
        <div className="fill-empty-option">
          <p>{renderData.ve1}</p>
          <input
            id={`input-dk-${renderData.id}`}
            className="card-homework-input"
            type="text"
            required
            placeholder="Nhập đáp án..."
            minLength={1}
          />
          <p>{renderData.ve2}</p>
        </div>
      );
    }
    this.noiDungBaiTap = noiDungBaiTap;
    this.dapAn = renderData.goiY;
  }
  async initLoadImage() {
    const image = new ImageLoader(this.imageUrl);
    const checkedImageUrl = await image.checkLoadableAndGetFinalImageSrc();
    this.imageUrl = checkedImageUrl;
    return this;
  }
  getResult() {
    const answer = this.#getAnswer().toLowerCase().trim();
    const isRight = this.dapAn.find((da) => da.toLowerCase().trim() === answer);
    if (isRight) {
      return { result: true, message: "Đúng rồi." };
    } else {
      return {
        result: false,
        message: this.dapAn[0],
      };
    }
  }
  #getAnswer() {
    let answer = "";
    const inputEle = document.getElementById(`input-dk-${this.inputId}`);
    if (inputEle) answer = inputEle.value;
    return answer;
  }
}

export class TracNghiemExercise extends ClassifyExercise {
  constructor({ _id, ordinal, deBai, renderData, tenBaiTap, maSo }) {
    super(_id, ordinal, deBai);
    this.maSo;
    this.renderData = renderData;
    const layCauHoiLamTenBaiTap = maSo.toLowerCase().includes("dh1.");
    this.cauHoi = layCauHoiLamTenBaiTap
      ? tenBaiTap
      : "Bé hãy chọn một đáp án dưới đây";
    this.inputId = renderData.id;
    //Ngay khi khởi tạo class, lấy obj renderData đẻ xử lý lấy ra những thứ cần
    this.imageUrl = renderData.imageUrl;
    //Xử lý nội dung câu hỏi tùy theo dạng điền khuyết
    this.options = renderData.datas.map((item) => {
      return { id: item.id, content: item.content, isSelected: false };
    });
    this.rightOption = renderData.datas.find((item) => item.isAnswer).id;
  }
  async initLoadImage() {
    const image = new ImageLoader(this.imageUrl);
    const checkedImageUrl = await image.checkLoadableAndGetFinalImageSrc();
    this.imageUrl = checkedImageUrl;
    return this;
  }
  getOptions() {
    return this.options;
  }
  getResult(choosenOptionId) {
    if (choosenOptionId === this.rightOption) {
      return { result: true, message: "Đúng rồi." };
    } else {
      return {
        result: false,
        message: this.options.find((opt) => opt.id === this.rightOption)
          .content,
      };
    }
  }
}
