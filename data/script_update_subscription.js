//Khi có cập nhật mã bài tập mới thì chạy script này để update thằng
//subscription.json bên dưới
const DIEN_KHUYET_VAN_DATAS = [
  "ai ay ây",
  "ao au âu",
  "oi ôi ơi",
  "on ôn ơn",
  "an ăn ân",
  "en ên in un",
  "am ăm âm",
  "om ôm ơm",
  "em êm im um",
  "ap ăp âp",
  "ep êp",
];
const DIEN_KHUYET_AM_DAU_DATAS = [
  "c-k",
  "g-gh",
  "ng-ngh",
  "s-x",
  "ch-tr",
  "r-gi-d",
  "ch-kh",
];
const DOC_HIEU_CAU_DATAS = [
  "1.DH3. Rùa con tìm nhà",
  "2.DH3.Tôi là HS lớp một",
  "3.DH3.Chợ hoa ngày tết ở HN",
  "4.DH3.Mũ bảo hiểm",
  "5.DH3.Khu rừng kì lạ dưới đáy biển",
  "6.DH3.Tiếng đàn",
  "7.DH3.Bài đọc cho gà trống",
  "8.DH3.Cuốn sách của em",
  "9.DH3.Lính cứu hỏa",
  "10.DH3.Bác trống trường",
  "11.DH3.Chú sóc ngoan",
  "12.DH3.Loài chim của biển cả",
  "13.DH3.Ruộng bậc thang ở Sapa",
  "14.DH3.Những cánh cò",
  "15.DH3.Chúa tể rừng xanh",
  "17.DH3.Ngày mới bắt đầu",
  "18.DH3.Anh hùng biển cả",
  "19.DH3.Chữ A và những người bạn",
  "21.DH3.Du lịch biển Việt Nam",
  "22.DH3.Gấu trắng là chúa tò mò",
  "23.DH3.Những ngày bà về phép",
  "24.DH3. Ở nhà sách",
  "25.DH3. Tôi là học sinh lớp hai",
  "26.DH3. Những điều cần biết về bút chì",
  "27.DH3. Vui học ở thảo cầm viên",
  "28.DH3. Ban mai trên bản",
  "29.DH3. Thư viện biết đi",
  "30.DH3. Làng gốm Bát Tràng",
  "31.DH3. Cô chổi rơm",
  "32.DH3. Hồ gươm",
  "33.DH3. Bưu điện TP Hồ Chí Minh",
  "34.DH3. Cái bàn học của tôi",
  "35.DH3. Góc nhỏ yêu thương",
  "36.DH3. Nữ hoàng của đảo",
  "37.DH3. Tôi là lego",
  "38.DH3. Bữa tiệc 36 món",
  "39.DH3. Kiến và chim bồ câu",
  "40.DH3. Chú bé chăn cừu",
];

const DOC_HIEU_DOAN_DATAS = [
  "1.DH3. Rùa con tìm nhà",
  "2.DH3.Tôi là HS lớp một",
  "3.DH3.Chợ hoa ngày tết ở HN",
  "4.DH3.Mũ bảo hiểm",
  "5.DH3.Khu rừng kì lạ dưới đáy biển",
  "6.DH3.Tiếng đàn",
  "7.DH3.Bài đọc cho gà trống",
  "8.DH3.Cuốn sách của em",
  "9.DH3.Lính cứu hỏa",
  "10.DH3.Bác trống trường",
  "11.DH3.Chú sóc ngoan",
  "12.DH3.Loài chim của biển cả",
  "13.DH3.Ruộng bậc thang ở Sapa",
  "14.DH3.Những cánh cò",
  "15.DH3.Chúa tể rừng xanh",
  "17.DH3.Ngày mới bắt đầu",
  "18.DH3.Anh hùng biển cả",
  "19.DH3.Chữ A và những người bạn",
  "20.DH3.Đất nước chúng mình",
  "21.DH3.Du lịch biển Việt Nam",
  "22.DH3.Gấu trắng là chúa tò mò",
  "23.DH3.Những ngày bà về phép",
  "24.DH3. Ở nhà sách",
  "25.DH3. Tôi là học sinh lớp hai",
  "26.DH3. Những điều cần biết về bút chì",
  "27.DH3. Vui học ở thảo cầm viên",
  "28.DH3. Ban mai trên bản",
  "29.DH3. Thư viện biết đi",
  "30.DH3. Làng gốm Bát Tràng",
  "31.DH3. Cô chổi rơm",
  "32.DH3. Hồ gươm",
  "33.DH3. Bưu điện TP Hồ Chí Minh",
  "34.DH3. Cái bàn học của tôi",
  "35.DH3. Góc nhỏ yêu thương",
  "36.DH3. Nữ hoàng của đảo",
  "37.DH3. Tôi là lego",
  "38.DH3. Bữa tiệc 36 món",
  "39.DH3. Kiến và chim bồ câu",
  "40.DH3. Chú bé chăn cừu",
];

//LOGIC SCRIPT Ở ĐÂY.

const myCategories = {
  categories: [
    {
      active: true,
      isSelected: false,
      _id: "item-1",
      name: "Điền khuyết vần",
      query: { field: "maSo", value: "tv4.van" },
      route: "/dien-khuyet-van",
      datas: [],
    },
    {
      active: true,
      isSelected: false,
      _id: "item-2",
      name: "Điền khuyết âm đầu",
      query: { field: "maSo", value: "tv4.amdau" },
      route: "/dien-khuyet-am-dau",
      datas: [],
    },
    {
      active: false,
      isSelected: false,
      _id: "item-3",
      name: "Đọc hiểu câu",
      query: { field: "maSo", value: "d1." },
      route: "/doc-hieu-cau",
      datas: [],
    },
    {
      active: false,
      isSelected: false,
      _id: "item-4",
      name: "Đọc hiểu văn bản",
      query: { field: "maSo", value: "dh1." },
      route: "/doc-hieu-van-ban",
      datas: [],
    },
  ],
};

myCategories.categories[0].datas = DIEN_KHUYET_VAN_DATAS.map((item) => {
  return {
    isSelected: false,
    _id: item,
    name: item,
    query: { field: "noiDungMucTieu", value: item },
  };
});

myCategories.categories[1].datas = DIEN_KHUYET_AM_DAU_DATAS.map((item) => {
  return {
    isSelected: false,
    _id: item,
    name: item,
    query: { field: "noiDungMucTieu", value: item },
  };
});

myCategories.categories[2].datas = DOC_HIEU_CAU_DATAS.map((item) => {
  return {
    isSelected: false,
    _id: item,
    name: item,
    query: { field: "tenBaiTap", value: item },
  };
});
myCategories.categories[3].datas = DOC_HIEU_DOAN_DATAS.map((item) => {
  return {
    isSelected: false,
    _id: item,
    name: item,
    query: { field: "noiDungMucTieu", value: item },
  };
});

//LOGIC GHI JSON..
const fs = require("fs");
const path = require("path");

const updateSubscriptionDatas = (categories) => {
  const filePath = path.join(__dirname, "subscription.json");
  fs.writeFile(
    filePath,
    JSON.stringify(categories, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        console.error("Có lỗi xảy ra khi ghi file:", err);
        return;
      }
      console.log("Ghi dữ liệu vào file subscription.json thành công!");
    }
  );
};

updateSubscriptionDatas(myCategories);
