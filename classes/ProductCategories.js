import SUBSCRIPTION_DATAS from "../data/subscription.json";

export default class ProdCates {
  constructor() {
    this.categories = SUBSCRIPTION_DATAS.categories;
  }

  getMainCates(pickedCateId) {
    //Xử lý lấy data mainCates
    const mainCates = this.categories.map((item) => {
      return {
        name: item.name,
        _id: item._id,
        isSelected: item.isSelected,
        active: true,
      };
    });
    const selectedMainCate = mainCates.find(
      (item) => item._id === pickedCateId
    );
    if (selectedMainCate) selectedMainCate.isSelected = true;
    return mainCates;
  }

  getChildCates(pickedCateId, pickedChildId) {
    //Xử lý lấy data childCates
    let childCates = [];
    const selectedMainDataCate = this.categories.find(
      (item) => item._id === pickedCateId
    );
    if (selectedMainDataCate) {
      childCates = selectedMainDataCate.datas.map((item) => {
        return {
          name: item.name,
          _id: item._id,
          isSelected: item.isSelected,
          active: true,
        };
      });
    }
    const selectedChildCate = childCates.find(
      (item) => item._id === pickedChildId
    );
    if (selectedChildCate) selectedChildCate.isSelected = true;
    return childCates;
  }

  getMainChildKeyQueryExercises(picked) {
    const { cate, child } = picked;
    let mainQuery = {};
    let childQuery = {};
    const pickedCateData = this.categories.find((item) => item._id === cate);
    if (pickedCateData) {
      mainQuery = pickedCateData.query;
      if (pickedCateData.datas) {
        const pickedChildData = pickedCateData.datas.find(
          (item) => item._id === child
        );
        if (pickedChildData) childQuery = pickedChildData.query;
      }
    }
    return { mainQuery, childQuery };
  }

  getDemoChildCates(pickedCateId, pickedChildId) {
    //Những data chỉ lấy cho childCateDemo
    const ALLOWED_CHILD_CATE = [
      { mainCate: "Điền khuyết vần", childCate: "ao au âu" },
      { mainCate: "Điền khuyết âm đầu", childCate: "c-k" },
      { mainCate: "Đọc hiểu câu", childCate: "3.DH3.Chợ hoa ngày tết ở HN" },
      { mainCate: "Đọc hiểu văn bản", childCate: "2.DH3.Tôi là HS lớp một" },
    ];
    //Xử lý lấy data childCates
    let childCates = [];
    const selectedMainDataCate = this.categories.find(
      (item) => item._id === pickedCateId
    );
    if (selectedMainDataCate) {
      const validMainCate = selectedMainDataCate.name;
      childCates = selectedMainDataCate.datas.map((item) => {
        return {
          name: item.name,
          _id: item._id,
          isSelected: item.isSelected,
          active:
            ALLOWED_CHILD_CATE.find((item) => item.mainCate === validMainCate)
              .childCate === item.name
              ? true
              : false,
        };
      });
    }
    //Thêm style cho childCate được chọn
    const selectedChildCate = childCates.find(
      (item) => item._id === pickedChildId
    );
    if (selectedChildCate) selectedChildCate.isSelected = true;
    return childCates;
  }
}
