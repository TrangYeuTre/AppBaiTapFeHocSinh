import CardHomework from "../UI/CardHomework";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import Subscription from "../../classes/Subscription";
import { useState, useEffect } from "react";
import LoadExercisesFailHint from "./LoadExercisesFailHint";
import ClassifyExercises from "./ClassifyExercises";
import axios from "axios";
import LocalNotification from "../UI/LocalNotification";
import { useLocalNotification } from "../../hooks/useHooks";

export default function LoadExercises() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { main, child } = router.query;
  const mainQuery = main ? JSON.parse(main) : {};
  const childQuery = child ? JSON.parse(child) : {};

  const { username, isExpired } = useSelector(
    (state) => state.subscriptionAuth
  );

  const [subscriptionInstance, setSubscriptionInstance] = useState(
    new Subscription({ username, isExpired })
  );
  const [isFetching, setIsFetching] = useState(false);
  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();

  //CB: fetct lấy bài tập về
  const loadExercises = async () => {
    try {
      setIsFetching(true);
      const updatedSubscriptionInstance =
        await subscriptionInstance.loadDemoExercises({
          axios,
          mainQuery,
          childQuery,
        });
      setSubscriptionInstance(
        new Subscription({ ...updatedSubscriptionInstance })
      );
    } catch (err) {
      console.log(err);
      doSetLocalNotification({
        status: err.response.status,
        message: err.response.data,
      });
    } finally {
      setIsFetching(false);
    }
  };

  const goToNextExercise = () => {
    const updatedSubscriptionInstance =
      subscriptionInstance.increaseExerciseIndex();
    setSubscriptionInstance(
      new Subscription({ ...updatedSubscriptionInstance })
    );
  };

  const quitExercisePackage = () => router.replace("/demo");

  useEffect(() => {
    loadExercises();
    //Ở đây phải reset bài làm của học sinh trên slice
    dispatch(SubscriptionAuthActions.resetStudentWork());
  }, []);

  const emptyExercises = subscriptionInstance.isEmptyExercises();

  const exerciseData = subscriptionInstance.getExerciseByCurrentIndex();

  return (
    <CardHomework>
      <div className="relative">
        <div className="absolute top-0 right-0">
          <button
            type="button"
            onClick={quitExercisePackage}
            className="btn btn-ghost !w-fit"
          >
            x
          </button>
        </div>
        {isFetching && <Loading />}
        <LocalNotification localNoti={localNoti} />
        {emptyExercises && (
          <LoadExercisesFailHint loadExercises={loadExercises} />
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
  );
}
