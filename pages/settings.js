import Settings from "../Components/Setting/Settings";
import SubscriptionProtect from "../Components/auth/SubscriptionProtect";

export default function SettingsRoute() {
  return (
    <SubscriptionProtect>
      <Settings />
    </SubscriptionProtect>
  );
}
