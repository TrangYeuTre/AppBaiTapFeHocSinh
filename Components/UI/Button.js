export default function Button({ children, onAction, plusStyle }) {
  return (
    <button
      onClick={() => {
        onAction();
      }}
      className={`flex flex-1 flex-row items-center justify-center py-1 px-4 rounded-xl text-xl
       text-coWhite bg-coPink hover:opacity-80 ${plusStyle}`}
    >
      {children}
    </button>
  );
}
