export default function Card({ children, plusStyle }) {
  return <div className={`card-wrapper ${plusStyle}`}>{children}</div>;
}
