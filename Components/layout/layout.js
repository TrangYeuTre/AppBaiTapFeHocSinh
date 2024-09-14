export default function Layout({ children }) {
  const preventRightClick = (e) => {
    //TẮT tạm FIXME:
    // e.preventDefault();
  };
  return (
    <div onContextMenu={preventRightClick}>
      {/* <Header /> */}
      <main className="py-10">{children}</main>
    </div>
  );
}
