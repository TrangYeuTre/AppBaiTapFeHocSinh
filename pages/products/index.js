import ProductCategories from "../../Components/Products/Categories";
import SubscriptionProtect from "../../Components/auth/SubscriptionProtect";
import BottomMenu from "../../Components/Products/General/BottomMenu";

export default function ProductRoute() {
  return (
    <SubscriptionProtect>
      <ProductCategories />
      <BottomMenu
        navigations={[
          { name: "🌟 Xem thành tích", route: "/subscription/archivements" },
          { name: "✏️ Củng cố kiến thức", route: "/products/consolidate" },
        ]}
      />
    </SubscriptionProtect>
  );
}
