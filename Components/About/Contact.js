import CardHomework from "../UI/CardHomework";
import Link from "next/link";
import staticData from "../../data/static.json";
import { FaFacebook } from "react-icons/fa";
import { SiZigbee } from "react-icons/si";
import { useSelector } from "react-redux";

export default function Contact() {
  const { token, username } = useSelector((state) => state.subscriptionAuth);
  const backTo = token ? "/products" : "/demo";

  return (
    <CardHomework>
      <div className="flex flex-col flex-wrap gap-6 p-4 relative">
        <h1 className="text-center">Thông tin liên hệ</h1>
        <Link className="btn-shape-back" href={backTo}>
          Trở lại
        </Link>
        <hr />
        <Link
          href={staticData.CONTACT_FACEBOOK}
          className="btn-shape btn-shape-main my-4 no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="mx-4" /> Facebook
        </Link>
        <Link
          href={staticData.CONTACT_ZALO}
          target="_blank"
          className="btn-shape btn-shape-main my-4 no-underline"
          rel="noopener noreferrer"
        >
          <SiZigbee className="mx-4" /> Zalo
        </Link>
      </div>
    </CardHomework>
  );
}
