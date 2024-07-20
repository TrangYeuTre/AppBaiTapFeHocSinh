export function isValidImageUrl(url) {
  let valid = false;
  if (
    url.toString().toLowerCase().includes("http://") ||
    url.toString().toLowerCase().includes("https://")
  ) {
    valid = true;
  }
  return valid;
}

export function scrollToElementId(elementId) {
  setTimeout(() => {
    const ele = document.getElementById(elementId);
    if (ele) ele.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

export function checkBlockHomework({ soLanNop, tinhTrang }) {
  let blockHomework = false;
  if (+soLanNop >= 3 || tinhTrang === "Đã sửa") blockHomework = true;
  return blockHomework;
}

export function devErrorMessage(message) {
  const showLog = process.env.NODE_ENV === "development";
  if (showLog) {
    console.log(message);
  }
}

export function manipulateWithLocalStorage({
  order,
  idBaiTap = "",
  content = "",
}) {
  if (!order) return;

  let result = "";
  switch (order) {
    case "clear":
      localStorage.clear();
      break;
    case "set":
      localStorage.setItem(idBaiTap, content);
      break;
    case "get":
      result = localStorage.getItem(idBaiTap);
      break;
    case "clearStudentWorks":
      for (let key in localStorage) {
        if (key.length > 20) {
          localStorage.removeItem(key);
        }
      }
  }
  if (order === "get") return result;
}

