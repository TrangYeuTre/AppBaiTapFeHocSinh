import SubscriptionProtect from "../../Components/auth/SubscriptionProtect";
import Archivements from "../../Components/Products/Archivements";
export default function ArchivementsRoute() {
  return (
    <SubscriptionProtect>
      <Archivements />
    </SubscriptionProtect>
  );
}
