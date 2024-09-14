export default function Button({ children, onAction, plusStyle }) {
  return (
    <button
      onClick={() => {
        onAction();
      }}
      className={`btn-shape btn-shape-submit !my-6 ${plusStyle}`}
    >
      {children}
    </button>
  );
}
