import LoadExercises from "../../../Components/Products/Exercises";
import SubscriptionProtect from "../../../Components/auth/SubscriptionProtect";

export default function LoadExercisesRoute() {
  return (
    <SubscriptionProtect>
      <LoadExercises />
    </SubscriptionProtect>
  );
}
