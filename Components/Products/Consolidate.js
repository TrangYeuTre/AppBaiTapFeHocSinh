import CardHomework from "../UI/CardHomework";
import SubcriptionProtect from "../auth/SubscriptionProtect";
import Loading from "../UI/Loading";
import LoadExercisesFailHint from "./LoadExercisesFailHint";
import ClassifyExercises from "./ClassifyExercises";
import Subscription from "../../classes/Subscription";
import QuitExerciseBar from "./General/QuitExerciseBar";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import { useAxiosInstance, useLocalNotification } from "../../hooks/useHooks";
import { useState, useEffect, useCallback } from "react";
import { devErrorMessage, checkErrorAndRedirectLogin } from "../../helper/uti";

export default function ConsolidateExercises() {
  const router = useRouter();
  const dispatch = useDispatch();
  const axiosInstance = useAxiosInstance();

  const { username, isExpired } = useSelector(
    (state) => state.subscriptionAuth
  );

  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();

  const [subscriptionInstance, setSubscriptionInstance] = useState(
    new Subscription({ username, isExpired })
  );
  const [isFetching, setIsFetching] = useState(false);

  //CB: fetct lấy bài tập về
  const loadExercises = useCallback(async () => {
    try {
      setIsFetching(true);
      const updatedSubscriptionInstance =
        await subscriptionInstance.loadRedoExercises({
          axiosInstance,
        });
      setSubscriptionInstance(
        new Subscription({ ...updatedSubscriptionInstance })
      );
    } catch (err) {
      devErrorMessage({
        err,
        from: "/Components/Products/Consolidate.js",
      });
      checkErrorAndRedirectLogin({ err, router });
    } finally {
      setIsFetching(false);
    }
  }, [subscriptionInstance, axiosInstance, router]);

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
    //Clear gởi api khi cần
    return () => {};
  }, []);

  const emptyExercises = subscriptionInstance.isEmptyExercises();
  const exerciseData = subscriptionInstance.getExerciseByCurrentIndex();

  return (
    <SubcriptionProtect>
      <CardHomework>
        <div className="relative">
          <QuitExerciseBar isDemo={false} />

          {isFetching && <Loading />}
          {emptyExercises && (
            <LoadExercisesFailHint
              loadExercises={loadExercises}
              localNoti={localNoti}
            />
          )}
          {!emptyExercises && (
            <>
              <ClassifyExercises
                exerciseData={exerciseData}
                subscriptionInstance={subscriptionInstance}
                goToNextExercise={goToNextExercise}
              />
            </>
          )}
        </div>
      </CardHomework>
    </SubcriptionProtect>
  );
}
