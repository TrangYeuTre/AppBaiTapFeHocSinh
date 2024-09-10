import Card from "../UI/Card";
import Link from "next/link";

export default function InitChooseApp() {
  return (
    <Card>
      <h1 className="text-center uppercase">Vui lòng chọn phiên bản app</h1>
      <hr className="border-2 border-dashed my-8" />
      <div className="grid grid-cols-3 p-8 gap-8">
        <Link
          href="/demo"
          className="btn-shape btn-shape-try col-span-1 no-underline"
          rel="noopener noreferrer"
        >
          <p className="text-center">Dùng thử app 👌</p>
        </Link>
        <Link
          href="/auth"
          className="btn-shape btn-shape-main col-span-1 no-underline"
          rel="noopener noreferrer"
        >
          <p className="text-center">Học sinh nhóm online cô Trang 🖥️</p>
        </Link>
        <Link
          href="/subscription"
          className="btn-shape btn-shape-submit col-span-1 no-underline"
          rel="noopener noreferrer"
        >
          <p className="text-center">Tài khoản mua tháng ✅</p>
        </Link>
      </div>
    </Card>
  );
}
