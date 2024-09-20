import CardHomework from "../UI/CardHomework";
import Link from "next/link";
import staticData from "../../data/static.json";
import { FaFacebook } from "react-icons/fa";
import { SiZigbee } from "react-icons/si";
import { useSelector } from "react-redux";

export default function Contact() {
  const { isExpired } = useSelector((state) => state.subscriptionAuth);
  const backTo = !isExpired ? "/products" : "/demo";

  return (
    <CardHomework>
      <div className="flex flex-col flex-wrap gap-6 p-4 relative ">
        <h1 className="product-title-center">Thông tin liên hệ</h1>
        <Link className="btn-shape-back" href={backTo}>
          Trở lại
        </Link>
        <hr className="!my-0" />
        <p>
          Để được giải đáp thắc mắc về chuyên môn và các vấn đề khó khăn của
          trẻ, vui lòng liên hệ với cô Trang qua facebook / zalo bên dưới.
        </p>
        <Link
          href={staticData.CONTACT_FACEBOOK}
          className="btn-shape btn-shape-main no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="mx-4" /> Facebook
        </Link>
        <Link
          href={staticData.CONTACT_ZALO}
          target="_blank"
          className="btn-shape btn-shape-main no-underline"
          rel="noopener noreferrer"
        >
          <SiZigbee className="mx-4" /> Zalo
        </Link>
        <hr className="!my-0" />
        <p>
          Để được hỗ trợ kĩ thuật hoặc báo lỗi trong quá trình dùng app xin hãy
          liên hệ facebook / zalo bên dưới
        </p>
        <Link
          href={staticData.CONTACT_SUPPORT_FACEBOOK}
          className="btn-shape btn-shape-try no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="mx-4" /> Facebook
        </Link>
        <Link
          href={staticData.CONTACT_SUPPORT_ZALO}
          target="_blank"
          className="btn-shape btn-shape-try no-underline"
          rel="noopener noreferrer"
        >
          <SiZigbee className="mx-4" /> Zalo
        </Link>
        {/* <hr className="!my-0" /> */}
      </div>
    </CardHomework>
  );
}
