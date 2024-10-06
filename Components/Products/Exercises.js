import CardHomework from "../UI/CardHomework";
import SubcriptionProtect from "../auth/SubscriptionProtect";
import Loading from "../UI/Loading";
import LoadExercisesFailHint from "./LoadExercisesFailHint";
import ClassifyExercises from "./ClassifyExercises";
import QuitExerciseBar from "./General/QuitExerciseBar";
import Subscription from "../../classes/Subscription";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useAxiosInstance } from "../../hooks/useHooks";
import { useState, useEffect, useMemo, useCallback } from "react";
import { devErrorMessage, checkErrorAndRedirectLogin } from "../../helper/uti";

export default function LoadExercises() {
  const router = useRouter();
  const dispatch = useDispatch();
  const axiosInstance = useAxiosInstance();

  const { main, child } = router.query;
  const mainQuery = useMemo(() => {
    try {
      return main ? JSON.parse(main) : {};
    } catch (error) {
      console.error("Invalid main query:", error);
      return {};
    }
  }, [main]);

  const childQuery = useMemo(() => {
    try {
      return child ? JSON.parse(child) : {};
    } catch (error) {
      console.error("Invalid child query:", error);
      return {};
    }
  }, [child]);

  const { username, isExpired } = useSelector(
    (state) => state.subscriptionAuth
  );

  const [subscriptionInstance, setSubscriptionInstance] = useState(
    new Subscription({ username, isExpired })
  );
  const [isFetching, setIsFetching] = useState(false);

  //CB: fetct lấy bài tập về
  const loadExercises = useCallback(async () => {
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
      devErrorMessage({ err, from: "/Components/Products/Exercises.js" });
      checkErrorAndRedirectLogin({ err, router });
    } finally {
      setIsFetching(false);
    }
  }, [subscriptionInstance, axiosInstance, mainQuery, childQuery, router]);

  const goToNextExercise = useCallback(() => {
    const updatedSubscriptionInstance =
      subscriptionInstance.increaseExerciseIndex();
    setSubscriptionInstance(
      new Subscription({ ...updatedSubscriptionInstance })
    );
  }, [subscriptionInstance]);

  useEffect(() => {
    loadExercises();
    //Ở đây phải reset bài làm của học sinh trên slice
    dispatch(SubscriptionAuthActions.resetStudentWork());
    //Clean up api ở đây
    return () => {};
  }, []);

  const emptyExercises = subscriptionInstance.isEmptyExercises();

  const exerciseData = subscriptionInstance.getExerciseByCurrentIndex();

  return (
    <SubcriptionProtect>
      {isFetching && <Loading />}
      {!isFetching && (
        <CardHomework>
          <div className="relative">
            <QuitExerciseBar isDemo={false} />
            {emptyExercises && (
              <LoadExercisesFailHint loadExercises={loadExercises} />
            )}
            {!emptyExercises && (
              <ClassifyExercises
                exerciseData={exerciseData}
                subscriptionInstance={subscriptionInstance}
                goToNextExercise={goToNextExercise}
              />
            )}
          </div>
        </CardHomework>
      )}
    </SubcriptionProtect>
  );
}
