import { Fragment } from "react";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="py-10">{children}</main>
    </div>
  );
}
