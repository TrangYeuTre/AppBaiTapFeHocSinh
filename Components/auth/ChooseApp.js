import Card from "../UI/Card";
import Link from "next/link";
import Image from "next/image";

export default function InitChooseApp() {
  return (
    <Card>
      <h1 className="text-center uppercase font-bold">
        Vui lòng chọn phiên bản app 👇
      </h1>
      <hr className="border-2 border-dashed my-4 lg:my-8" />
      <div className="p-4 flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-8 lg:p-8">
        <Link
          href="/demo"
          className="btn-shape btn-shape-try col-span-1 no-underline"
          rel="noopener noreferrer"
        >
          <div className="icon-wrapper">
            <Image
              alt="bottom menu icon"
              src="/assets/icons/try.svg"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center">Dùng thử app</p>
        </Link>
        <Link
          href="/auth"
          className="btn-shape btn-shape-main col-span-1 no-underline"
          rel="noopener noreferrer"
        >
          <div className="icon-wrapper">
            <Image
              alt="bottom menu icon"
              src="/assets/icons/school.svg"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center">Học sinh nhóm online cô Trang </p>
        </Link>
        <Link
          href="/subscription"
          className="btn-shape btn-shape-submit col-span-1 no-underline"
          rel="noopener noreferrer"
        >
          <div className="icon-wrapper">
            <Image
              alt="bottom menu icon"
              src="/assets/icons/calendar.svg"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-center">Tài khoản mua tháng</p>
        </Link>
      </div>
    </Card>
  );
}
