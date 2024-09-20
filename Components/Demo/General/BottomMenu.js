import { useRouter } from "next/router";

export default function BottomMenu({ navigations }) {
  const router = useRouter();
  return (
    <section className="bottom-menu-wrapper">
      <div className="bottom-menu-content">
        {navigations &&
          navigations.map((item) => (
            <button
              key={item.name}
              id={item.name}
              className={`btn-shape w-fit ${
                item.route ? "btn-shape-main" : "btn-shape-disabled"
              }`}
              onClick={() => {
                router.replace(item.route);
              }}
            >
              {item.name}
            </button>
          ))}
      </div>
    </section>
  );
}
