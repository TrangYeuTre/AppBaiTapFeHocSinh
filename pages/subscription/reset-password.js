import { useRouter } from "next/router";
import SubscriptionResetPassword from "../../Components/auth/SubscriptionResetPassword";

export default function ResetPasswordRoute() {
  const router = useRouter();
  const { token, username } = router.query;
  return <SubscriptionResetPassword token={token} username={username} />;
}
