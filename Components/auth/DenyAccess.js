import CardHomework from "../UI/CardHomework";
import { useRouter } from "next/router";

export default function DenyAccess() {
  const router = useRouter();
  return (
    <CardHomework>
      <p className="p-4 text-center">
        Truy cập bị từ chối. Trở lại trang đăng nhập{" "}
        <span
          className="uppercase text-coPink cursor-pointer hover:opacity-80"
          onClick={() => {
            router.replace("/subscription");
          }}
        >
          tại đây
        </span>
      </p>
    </CardHomework>
  );
}
