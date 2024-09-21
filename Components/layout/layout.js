export default function Layout({ children }) {
  const preventRightClick = (event) => {
    if (process.env.NODE_ENV === "production") {
      event.preventDefault();
    }
  };
  return (
    <div onContextMenu={preventRightClick}>
      <main className="py-10">{children}</main>
    </div>
  );
}
