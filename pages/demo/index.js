import ProductCategories from "../../Components/Demo/Categories";
import BottomMenu from "../../Components/Products/General/BottomMenu";

export default function DemoRoute() {
  return (
    <>
      <ProductCategories />
      <BottomMenu
        noSignOutIcon={true}
        navigations={[
          {
            name: "Xem thành tích",
            route: "",
            icon: "/assets/icons/medal.svg",
          },
          {
            name: "Củng cố kiến thức",
            route: "",
            icon: "/assets/icons/lamp.svg",
          },
          {
            name: "Thông tin",
            route: "/about",
            icon: "/assets/icons/infos.svg",
          },
          {
            name: "Liên hệ",
            route: "/contact",
            icon: "/assets/icons/contact.svg",
          },
          {
            name: "Thanh toán",
            route: "/payment",
            icon: "/assets/icons/payment.svg",
          },
        ]}
      />
    </>
  );
}
