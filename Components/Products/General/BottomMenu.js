import { useRouter } from "next/router";
import Image from "next/image";

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
              <div className="icon-wrapper">
                {item.icon && (
                  <Image
                    alt="bottom menu icon"
                    src={item.icon}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <p className="button-title-responsive">{item.name}</p>
            </button>
          ))}
      </div>
    </section>
  );
}
