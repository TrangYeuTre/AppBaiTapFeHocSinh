import CardHomework from "../UI/CardHomework";
import SubcriptionProtect from "../auth/SubscriptionProtect";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Subscription from "../../classes/Subscription";
import { useAxiosInstance } from "../../hooks/useHooks";
import { useState, useEffect } from "react";
import LoadExercisesFailHint from "./LoadExercisesFailHint";
import ClassifyExercises from "./ClassifyExercises";

export default function LoadExercises() {
  //
  const router = useRouter();
  const { main, child } = router.query;
  const mainQuery = main ? JSON.parse(main) : {};
  const childQuery = child ? JSON.parse(child) : {};

  const { username, token } = useSelector((state) => state.subscriptionAuth);
  const axiosInstance = useAxiosInstance(token);

  const [subscriptionInstance, setSubscriptionInstance] = useState(
    new Subscription({ username, token })
  );
  const [isFetching, setIsFetching] = useState(false);

  //CB: fetct lấy bài tập về
  const loadExercises = async () => {
    try {
      setIsFetching(true);
      const updatedSubscriptionInstance =
        await subscriptionInstance.loadExercises({
          axiosInstance,
          mainQuery,
          childQuery,
        });
      setSubscriptionInstance(
        new Subscription({ ...updatedSubscriptionInstance })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  // const giaLapToiBaiTapTiepTheo = () => {
  //   const updatedSubscriptionInstance =
  //     subscriptionInstance.increaseExerciseIndex();
  //   setSubscriptionInstance(
  //     new Subscription({ ...updatedSubscriptionInstance })
  //   );
  // };

  useEffect(() => {
    loadExercises();
  }, []);

  const emptyExercises = subscriptionInstance.isEmptyExercises();

  const exerciseData = subscriptionInstance.getExerciseByCurrentIndex();

  return (
    <SubcriptionProtect>
      <CardHomework>
        {isFetching && <Loading />}
        {emptyExercises && (
          <LoadExercisesFailHint loadExercises={loadExercises} />
        )}
        {!emptyExercises && (
          <>
            TODO:here , đang dừng ở đây
            <ClassifyExercises exerciseData={exerciseData} />
            {/* <p>
              stt: {renderExercise.ordinal}-{renderExercise.tenBaiTap}-{" "}
              {renderExercise.maSo}
            </p>
            <button
              className="btn btn-main"
              type="button"
              onClick={giaLapToiBaiTapTiepTheo}
            >
              Tăng
            </button> */}
          </>
        )}
      </CardHomework>
    </SubcriptionProtect>
  );
}
