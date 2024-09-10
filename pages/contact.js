import Contact from "../Components/About/Contact";
import BottomMenu from "../Components/Demo/General/BottomMenu";

export default function ContactRoute() {
  return (
    <>
      <Contact />
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
