import { Fragment } from "react";
import Header from "./Header";

export default function Layout({ children }) {
  const preventRightClick = (e) => {
    e.preventDefault();
  };
  return (
    <div onContextMenu={preventRightClick}>
      <Header />
      <main className="py-10">{children}</main>
    </div>
  );
}
