export default class ImageLoader {
  constructor(src) {
    this.src = src;
  }
  loadable = false;

  async checkLoadableAndGetFinalImageSrc() {
    if (!this.src) return "";
    try {
      this.loadable = await this.#isImageValidAsync(this.src);
      // console.log(await this.#isImageValidAsync(this.src));
    } catch (err) {
      console.log(err);
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

    // Tạo một đối tượng Image mới
    const image = new Image();

    // Xử lý sự kiện onload để kiểm tra xem hình ảnh có tải thành công hay không
    image.onload = () => {
      return true;
    };

    // Xử lý sự kiện onerror để báo lỗi nếu hình ảnh không tải được
    image.onerror = () => {
      return false;
    };

    // Thiết lập URL cho hình ảnh và tải nó
    image.src = imageURL;

    // Sử dụng await để đợi hình ảnh tải xong
    const result = new Promise((resolve, reject) => {
      image.onload = () => resolve(true);
      image.onerror = () => reject(false);
    });

    // Trả về kết quả
    return result;
  }

  #checkIs404Src() {
    if (this.loadable) return this;
    this.src = process.env.IMAGE_404;
    return this;
  }
}
