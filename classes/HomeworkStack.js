export default class HomeworkStack {
  constructor(
    idBaiTapVeNhaCon,
    ordinalNumber,
    nguoiSuaBaiTap,
    end,
    ketQua,
    soLanNop,
    renderDatas = {}
  ) {
    this.idBaiTapVeNhaCon = idBaiTapVeNhaCon;
    this.ordinalNumber = ordinalNumber;
    this.nguoiSuaBaiTap = nguoiSuaBaiTap;
    this.end = end;
    this.ketQua = ketQua;
    this.soLanNop = soLanNop;
    this.renderDatas = renderDatas;
  }
}

export class HomeworkStackWritting extends HomeworkStack {
  constructor(
    idBaiTapVeNhaCon,
    ordinalNumber,
    nguoiSuaBaiTap,
    end,
    ketQua,
    soLanNop,
    renderDatas = {},
    type = "viet",
    idBaiTapViet
  ) {
    super(
      idBaiTapVeNhaCon,
      ordinalNumber,
      nguoiSuaBaiTap,
      end,
      ketQua,
      soLanNop,
      renderDatas
    );
    this.type = type;
    this.idBaiTapViet = idBaiTapViet;
  }
}

export class HomeworkStackFillEmpty extends HomeworkStack {
  constructor(
    idBaiTapVeNhaCon,
    ordinalNumber,
    nguoiSuaBaiTap,
    end,
    ketQua,
    soLanNop,
    renderDatas = {},
    type = "dienKhuyet",
    idBaiTapDienKhuyet
  ) {
    super(
      idBaiTapVeNhaCon,
      ordinalNumber,
      nguoiSuaBaiTap,
      end,
      ketQua,
      soLanNop,
      renderDatas
    );
    this.type = type;
    this.idBaiTapDienKhuyet = idBaiTapDienKhuyet;
  }
}

export class HomeworkStackTrueFalse extends HomeworkStack {
  constructor(
    idBaiTapVeNhaCon,
    ordinalNumber,
    nguoiSuaBaiTap,
    end,
    ketQua,
    soLanNop,
    renderDatas = {},
    type = "tracNghiem"
  ) {
    super(
      idBaiTapVeNhaCon,
      ordinalNumber,
      nguoiSuaBaiTap,
      end,
      ketQua,
      soLanNop,
      renderDatas
    );
    this.type = type;
  }
}
export class HomeworkStackMatching extends HomeworkStack {
  constructor(
    idBaiTapVeNhaCon,
    ordinalNumber,
    nguoiSuaBaiTap,
    end,
    ketQua,
    soLanNop,
    renderDatas = {},
    type = "matching"
  ) {
    super(
      idBaiTapVeNhaCon,
      ordinalNumber,
      nguoiSuaBaiTap,
      end,
      ketQua,
      soLanNop,
      renderDatas
    );
    this.type = type;
  }
}
