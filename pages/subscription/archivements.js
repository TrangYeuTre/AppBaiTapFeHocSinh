import SubscriptionProtect from "../../Components/auth/SubscriptionProtect";
import Archivements from "../../Components/Products/Archivements";
import BottomMenu from "../../Components/Products/General/BottomMenu";
export default function ArchivementsRoute() {
  return (
    <SubscriptionProtect>
      <Archivements />
      <BottomMenu
        navigations={[
          {
            name: "Chọn bài tập",
            route: "/products",
            icon: "/assets/icons/notebook.svg",
          },
          {
            name: "Củng cố kiến thức",
            route: "/products/consolidate",
            icon: "/assets/icons/lamp.svg",
          },
          {
            name: "Cài đặt",
            route: "/settings",
            icon: "/assets/icons/setting.svg",
          },
        ]}
      />
    </SubscriptionProtect>
  );
}
