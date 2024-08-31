import ProductCategories from "../../Components/Products/Categories";
import SubscriptionProtect from "../../Components/auth/SubscriptionProtect";

export default function ProductRoute() {
  return (
    <SubscriptionProtect>
      <ProductCategories />
    </SubscriptionProtect>
  );
}
