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

//CB bỏ dấu thanh cho nguyên âm tiếng việt
export function removeVietNammeseTone(inputString) {
  if (!inputString) return "";
  //Mẫu chuyển nguyên âm có dấu thanh về không dấu thah
  const tones = {
    á: "a",
    à: "a",
    ạ: "a",
    ã: "a",
    ả: "a",

    ắ: "ă",
    ằ: "ă",
    ẳ: "ă",
    ẵ: "ă",
    ặ: "ă",

    ấ: "â",
    ầ: "â",
    ẩ: "â",
    ẫ: "â",
    ậ: "â",

    é: "e",
    è: "e",
    ẻ: "e",
    ẽ: "e",
    ẹ: "e",

    ế: "ê",
    ề: "ê",
    ể: "ê",
    ễ: "ê",
    ệ: "ê",

    í: "i",
    ì: "i",
    ỉ: "i",
    ĩ: "i",
    ị: "i",

    ó: "o",
    ò: "o",
    ỏ: "o",
    õ: "o",
    ọ: "o",

    ố: "ô",
    ồ: "ô",
    ổ: "ô",
    ỗ: "ô",
    ộ: "ô",

    ớ: "ơ",
    ờ: "ơ",
    ở: "ơ",
    ỡ: "ơ",
    ợ: "ơ",

    ú: "u",
    ù: "u",
    ủ: "u",
    ũ: "u",
    ụ: "u",

    ứ: "ư",
    ừ: "ư",
    ử: "ư",
    ữ: "ư",
    ự: "ư",

    ý: "y",
    ỳ: "y",
    ỷ: "y",
    ỹ: "y",
    ỵ: "y",
  };
  const lowercaseInput = inputString.toLowerCase();
  let result = "";
  //Lặp kí tự trong inputString
  for (let char of lowercaseInput) {
    if (tones[char]) {
      result += tones[char];
    } else {
      result += char;
    }
  }
  return result;
}

export const formatDateFillInput = (date) => {
  const time = new Date(date);
  let month = time.getMonth() + 1;
  if (month.toString().length === 1) month = `0${month}`;
  let day = time.getDate();
  if (day.toString().length === 1) day = `0${day}`;

  return `${time.getFullYear()}-${month}-${day}`;
};
