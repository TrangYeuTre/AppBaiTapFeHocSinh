import CardHomework from "../UI/CardHomework";
import { useState, useEffect } from "react";
// import SUBSCRIPTION_DATAS from "../../data/subscription.json";
import ItemPicker from "../UI/ItemPicker";
import ProdCates from "../../classes/ProductCategories";
import { useRouter } from "next/router";

export default function ProductCategories() {
  const router = useRouter();
  const [picked, setPicked] = useState({ cate: "", child: "" });

  const categories = new ProdCates();
  const mainCates = categories.getMainCates(picked.cate);
  const childCates = categories.getChildCates(picked.cate, picked.child);

  const pickMainCate = (cate) => {
    setPicked((preState) => {
      return { ...preState, cate: cate._id, child: "" };
    });
  };
  const pickChildCate = (child) => {
    setPicked((preState) => {
      return { ...preState, child: child._id };
    });
  };
  const loadExerciseHandler = (e) => {
    e.preventDefault();
    const { mainQuery, childQuery } =
      categories.getMainChildKeyQueryExercises(picked);

    router.replace(
      `/products/exercises?main=${JSON.stringify(
        mainQuery
      )}&child=${JSON.stringify(childQuery)}`
    );
  };

  useEffect(() => {
    const scrollToActionElement = document.getElementById(
      "picked-cate-scroll-to"
    );
    if (scrollToActionElement)
      scrollToActionElement.scrollIntoView({ behavior: "smooth" });
  }, [picked.child]);

  return (
    <CardHomework>
      <form className="card-homework-content" onSubmit={loadExerciseHandler}>
        <h2 className="product-title-left">Chọn chuyên đề</h2>
        <ItemPicker itemsIn={mainCates} itemOut={pickMainCate} />
        {picked.cate && (
          <>
            <hr />
            <h2 className="product-title-left">Chọn bài tập</h2>
            <ItemPicker itemsIn={childCates} itemOut={pickChildCate} />
          </>
        )}
        {picked.cate && picked.child && (
          <>
            <hr />
            <button
              id="picked-cate-scroll-to"
              type="submit"
              className="btn-shape btn-shape-submit"
            >
              Tải bài tập
            </button>
          </>
        )}
      </form>
    </CardHomework>
  );
}
