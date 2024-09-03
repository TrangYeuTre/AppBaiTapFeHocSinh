import SubscriptionProtect from "../../../Components/auth/SubscriptionProtect";
import BottomMenu from "../../../Components/Products/General/BottomMenu";
import CardHomework from "../../../Components/UI/CardHomework";

export default function ConsolidateRoute() {
  return (
    <SubscriptionProtect>
      <CardHomework>
        <p>Trang load bài tập củng cố kiên thức</p>
      </CardHomework>

      <BottomMenu
        navigations={[
          { name: "Chọn bài tập", route: "/products" },
          { name: "Xem thành tích", route: "/subscription/archivements" },
        ]}
      />
    </SubscriptionProtect>
  );
}
