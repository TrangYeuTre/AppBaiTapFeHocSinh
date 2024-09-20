import CardHomework from "../UI/CardHomework";
import SubcriptionProtect from "../auth/SubscriptionProtect";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { SubscriptionAuthActions } from "../../store/subscriptionSlice";
import Subscription from "../../classes/Subscription";
import { useAxiosInstance } from "../../hooks/useHooks";
import { useState, useEffect } from "react";
import LoadExercisesFailHint from "./LoadExercisesFailHint";
import ClassifyExercises from "./ClassifyExercises";
import QuitExerciseBar from "./General/QuitExerciseBar";

export default function LoadExercises() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { main, child } = router.query;
  const mainQuery = main ? JSON.parse(main) : {};
  const childQuery = child ? JSON.parse(child) : {};

  const { username, isExpired } = useSelector(
    (state) => state.subscriptionAuth
  );

  const axiosInstance = useAxiosInstance();

  const [subscriptionInstance, setSubscriptionInstance] = useState(
    new Subscription({ username, isExpired })
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

  const goToNextExercise = () => {
    const updatedSubscriptionInstance =
      subscriptionInstance.increaseExerciseIndex();
    setSubscriptionInstance(
      new Subscription({ ...updatedSubscriptionInstance })
    );
  };

  useEffect(() => {
    loadExercises();
    //Ở đây phải reset bài làm của học sinh trên slice
    dispatch(SubscriptionAuthActions.resetStudentWork());
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
