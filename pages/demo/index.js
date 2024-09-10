import ProductCategories from "../../Components/Demo/Categories";
import BottomMenu from "../../Components/Demo/General/BottomMenu";

export default function DemoRoute() {
  return (
    <>
      <ProductCategories />
      <BottomMenu
        navigations={[
          { name: "🌟 Xem thành tích", route: "" },
          { name: "✏️ Củng cố kiến thức", route: "" },
          { name: "📚 Thông tin", route: "/about" },
          { name: "📞 Liên hệ", route: "/contact" },
        ]}
      />
    </>
  );
}
