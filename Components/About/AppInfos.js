import CardHomework from "../UI/CardHomework";
import Link from "next/link";
import staticData from "../../data/static.json";
import { useSelector } from "react-redux";

export default function AppInfos() {
  const { isExpired } = useSelector((state) => state.subscriptionAuth);
  const backTo = !isExpired ? "/products" : "/demo";

  return (
    <CardHomework>
      <div className="p-6 flex flex-col gap-6 relative">
        <Link className="btn-shape-back" href={backTo}>
          Trở lại
        </Link>
        <h1 className="text-xl font-bold uppercase">
          Phiên bản:{" "}
          <span className="text-coRed">{staticData.APP_VERSION}</span>
        </h1>

        <hr />
        {/* {infos.length === 0 && <p>Chưa có thông tin.</p>} */}
        <h2 className="!text-left font-bold !p-0">Tính năng chính</h2>

        <ul className="flex flex-col gap-4 list-disc">
          <li>
            Lựa chọn và làm bài tập: phụ huynh chọn bài tập và giao cho bé thực
            hiện.
          </li>
          <li>Hiển thị đáp án ngay khi trẻ xác nhận câu trả lời.</li>
          <li>Xem thành tích của 10 lần làm bài tập gần nhất.</li>
          <li>
            Củng cố kiến thức: làm lại ngẫu nhiên các bài tập mà trẻ đã làm sai.
          </li>
        </ul>
        <hr />
        <h2 className="!text-left font-bold !p-0">Cập nhật gần nhất</h2>
        <ul className="flex flex-col gap-4 list-disc">
          <li>Cải thiện hiệu năng.</li>
          <li>Gỡ bỏ tính năng giao bài cho học sinh lớp học cô Trang.</li>
          <li>Gỡ tính năng xem số lượng bài tập trong about.</li>
          <li>Thêm tính năng tìm kiếm bài tập theo tên.</li>
          <li>
            Cập nhật bài tập Điền khuyết vần: at-ac, eo-êu, ia-ua-ưa, ip-it
          </li>
          <li>
            Cập nhật bài tập Đọc hiểu câu, Đọc hiểu văn bản: thêm 20 bài, từ bài
            41.DH3.Cây liễu dẻo dai đến 60.DH3.Mùa đông ở vùng cao
          </li>
        </ul>
      </div>
    </CardHomework>
  );
}
