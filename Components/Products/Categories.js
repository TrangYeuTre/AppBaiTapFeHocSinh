import CardHomework from "../UI/CardHomework";
import { useState, useMemo, useCallback } from "react";
import ItemPicker from "../UI/ItemPicker";
import ProdCates from "../../classes/ProductCategories";
import { useRouter } from "next/router";

export default function ProductCategories({ triggerShowHideBottomMenu }) {
  const router = useRouter();
  const [picked, setPicked] = useState({ cate: "", child: "" });

  const categories = useMemo(() => new ProdCates(), []);
  const mainCates = useMemo(() => categories.getMainCates(picked.cate), [picked.cate, categories]);
  const childCates = useMemo(() => categories.getChildCates(picked.cate, picked.child), [picked.cate, picked.child, categories]);

  const pickMainCate = useCallback(
    (cate) => {
      if (cate?._id) {
        setPicked({ cate: cate._id, child: "" });
        triggerShowHideBottomMenu?.("show");
      }
    },
    [triggerShowHideBottomMenu]
  );

  const pickChildCate = useCallback(
    (child) => {
      if (child?._id) {
        setPicked((prevState) => ({ ...prevState, child: child._id }));
        triggerShowHideBottomMenu?.("hide");
      }
    },
    [triggerShowHideBottomMenu]
  );

  const saveSearchResultToLocalStorage = useCallback(() => {
    const { mainQuery, childQuery } = categories.getMainChildKeyQueryExercises(picked);
    localStorage.setItem("mainCate", JSON.stringify(mainQuery));
    localStorage.setItem("childCate", JSON.stringify(childQuery));
  }, [picked, categories]);

  const loadExerciseHandler = useCallback(
    (e) => {
      e.preventDefault();
      saveSearchResultToLocalStorage();
      const { mainQuery, childQuery } = categories.getMainChildKeyQueryExercises(picked);
      router.replace(
        `/products/exercises?main=${JSON.stringify(mainQuery)}&child=${JSON.stringify(childQuery)}`
      );
    },
    [picked, categories, router, saveSearchResultToLocalStorage]
  );

  return (
    <CardHomework>
      <form
        className="card-homework-content mb-4 lg:mb-6 xl:mb-8"
        onSubmit={loadExerciseHandler}
      >
        <h2 className="product-title-left">Chọn chuyên đề</h2>
        <ItemPicker itemsIn={mainCates} itemOut={pickMainCate} />

        {picked.cate && (
          <>
            <hr />
            <h2 className="product-title-left">Chọn bài tập</h2>
            <ItemPicker
              itemsIn={childCates}
              itemOut={pickChildCate}
              showSearchItem={true}
              picked={picked}
            />
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
