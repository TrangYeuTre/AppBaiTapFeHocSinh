import ProductCategories from "../../Components/Products/Categories";
import SubscriptionProtect from "../../Components/auth/SubscriptionProtect";
import BottomMenu from "../../Components/Products/General/BottomMenu";

export default function ProductRoute() {
  return (
    <SubscriptionProtect>
      <ProductCategories />
      <BottomMenu
        navigations={[
          {
            name: "Xem thành tích",
            route: "/subscription/archivements",
            icon: "/assets/icons/medal.svg",
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
