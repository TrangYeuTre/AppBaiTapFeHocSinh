export default function LocalNotification({ localNoti }) {
  const { status, message } = localNoti;

  let notiStyle = `animate-pulse my-3 text-coBlue1`;
  if (status === 200 || status === 201)
    notiStyle = notiStyle + " !text-coGreen";
  if (status === 500 || status === 401 || status === 404 || status === 403)
    notiStyle = notiStyle + " !text-coRed";

  if (!message) return null;
  return <p className={notiStyle}>{message || null}</p>;
}
