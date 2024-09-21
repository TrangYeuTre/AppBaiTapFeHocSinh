import { devErrorMessage } from "../helper/uti";
export default class ImageLoader {
  constructor(src) {
    this.src = src;
  }
  loadable = false;

  async checkLoadableAndGetFinalImageSrc() {
    if (!this.src) return "";
    try {
      this.loadable = await this.#isImageValidAsync(this.src);
    } catch (err) {
      devErrorMessage({
        err,
        from: "classes/IamgeLoader.js",
      });
      this.loadable = false;
    }
    this.#checkIs404Src();
    return this.src;
  }
  #isImageValidAsync(imageURL) {
    // Kiểm tra xem URL có phải là chuỗi hay không
    if (typeof imageURL !== "string") {
      return false;
    }

    // Loại bỏ khoảng trắng
    imageURL = imageURL.trim();

    // Kiểm tra xem URL có rỗng hay không
    if (imageURL === "") {
      return false;
    }

    // Tạo một Promise để kiểm tra hình ảnh
    return new Promise((resolve) => {
      const image = new Image();

      // Xử lý khi hình ảnh tải thành công
      image.onload = () => resolve(true);

      // Xử lý khi không tải được hình ảnh
      image.onerror = () => resolve(false);

      // Thiết lập URL cho hình ảnh và tải nó
      image.src = imageURL;
    });
  }

  #checkIs404Src() {
    if (this.loadable) return this;
    this.src = process.env.IMAGE_404;
    return this;
  }
}
