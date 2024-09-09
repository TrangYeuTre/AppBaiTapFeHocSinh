import SubscriptionProtect from "../../../Components/auth/SubscriptionProtect";
import ConsolidateExercises from "../../../Components/Products/Consolidate";

export default function ConsolidateRoute() {
  return (
    <SubscriptionProtect>
      <ConsolidateExercises />
    </SubscriptionProtect>
  );
}
