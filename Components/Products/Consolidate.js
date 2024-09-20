import CardHomework from "../UI/CardHomework";
import SubcriptionProtect from "../auth/SubscriptionProtect";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import Subscription from "../../classes/Subscription";
import { useAxiosInstance, useLocalNotification } from "../../hooks/useHooks";
import { useState, useEffect } from "react";
import LoadExercisesFailHint from "./LoadExercisesFailHint";
import ClassifyExercises from "./ClassifyExercises";
import LocalNotification from "../UI/LocalNotification";

export default function ConsolidateExercises() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { username, isExpired } = useSelector(
    (state) => state.subscriptionAuth
  );

  const axiosInstance = useAxiosInstance();
  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();

  const [subscriptionInstance, setSubscriptionInstance] = useState(
    new Subscription({ username, isExpired })
  );
  const [isFetching, setIsFetching] = useState(false);

  //CB: fetct lấy bài tập về
  const loadExercises = async () => {
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
      console.log(err);
      doSetLocalNotification({
        status: err.response.status,
        message: err.response.data.data.message,
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

  const quitExercisePackage = () => router.replace("/products");

  useEffect(() => {
    loadExercises();
    //Ở đây phải reset bài làm của học sinh trên slice
    dispatch(SubscriptionAuthActions.resetStudentWork());
  }, []);

  const emptyExercises = subscriptionInstance.isEmptyExercises();

  const exerciseData = subscriptionInstance.getExerciseByCurrentIndex();

  return (
    <SubcriptionProtect>
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
