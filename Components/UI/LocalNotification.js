export default function LocalNotification({ localNoti }) {
  if (!localNoti) return null;
  const { status = 0, message = "" } = localNoti;

  let notiStyle = `animate-pulse my-3 text-coBlue1 text-center`;
  if (status >= 200 && status < 300) notiStyle = notiStyle + " !text-coGreen";
  if (status >= 400 && status < 600) notiStyle = notiStyle + " !text-coRed";

  if (!message) return null;
  return <p className={notiStyle}>{message || null}</p>;
}
