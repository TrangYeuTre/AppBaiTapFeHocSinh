export default function LocalError({ errorMessage }) {
  return (
    <div
      id="local-submit-homework-error-message"
      className="flex flex-col justify-center items-center 
    gap bg-coRed opacity-80 p-4 gap-3 rounded-xl"
    >
      <label className="text-coWhite font-bold">Lỗi ⚠️⚠️⚠️</label>
      <p className="text-coWhite ">{errorMessage}</p>
    </div>
  );
}
