import ProductCategories from "../../Components/Products/Categories";
import SubscriptionProtect from "../../Components/auth/SubscriptionProtect";
import BottomMenu from "../../Components/Products/General/BottomMenu";
import { useState } from "react";

export default function ProductRoute() {
  const [showBottomMenu, setShowBottomMenu] = useState(true);

  const triggerShowHideBottomMenu = (action) => {
    if (!action) {
      return;
    }
    if (action === "show") {
      setShowBottomMenu(true);
    } else if (action === "hide") {
      setShowBottomMenu(false);
    }
  };

  return (
    <SubscriptionProtect>
      <ProductCategories
        triggerShowHideBottomMenu={triggerShowHideBottomMenu}
      />
      {showBottomMenu && (
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
      )}
    </SubscriptionProtect>
  );
}
