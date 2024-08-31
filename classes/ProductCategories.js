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
}
