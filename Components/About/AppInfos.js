import CardHomework from "../UI/CardHomework";
import staticData from "../../data/static.json";
import axios from "axios";
import { getAppInfos } from "../../helper/axiosApi";
import { useEffect, useState } from "react";
import { useLocalNotification } from "../../hooks/useHooks";
import LocalNotification from "../UI/LocalNotification";
import Loading from "../UI/Loading";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function AppInfos() {
  const { token, username } = useSelector((state) => state.subscriptionAuth);
  const backTo = token ? "/products" : "/demo";

  const [isFetching, setIsFetching] = useState(false);
  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();
  const [infos, setInfos] = useState([]);
  const fetchGetAppInfos = async () => {
    try {
      setIsFetching(true);
      const response = await getAppInfos({ axios });
      if (response.status === 200) {
        doSetLocalNotification({
          status: 200,
          message: "Tải thông tin thành công",
          showtime: 2000,
        });
        setInfos(response.data.data.data);
      }
    } catch (err) {
      console.log(err);
      doSetLocalNotification({
        status: 400,
        message: "Tải thông tin lỗi.",
        showtime: 3000,
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <CardHomework>
      <LocalNotification localNoti={localNoti} />
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
        <h2 className="!text-left font-bold !p-0">Các tính năng</h2>

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
        <button
          className="btn-shape btn-shape-try"
          type="button"
          onClick={fetchGetAppInfos}
        >
          {!isFetching
            ? "👉 Bấm để xem danh sách bài tập 09/2024"
            : "Đang tải thông tin...⏳"}
        </button>
        <ul className="flex flex-col gap-6">
          {infos.length > 0 &&
            infos.map((category) => {
              return (
                <li key={category.mainCate}>
                  <h3 className="text-3xl font-semibold my-4">
                    {category.mainCate}
                  </h3>
                  <ul className="p-4 rounded-xl flex flex-row flex-wrap gap-4 bg-coPink2">
                    {category.sumarize.length > 0 &&
                      category.sumarize.map((item) => (
                        <li
                          key={item.childCate}
                          className="flex flex-col flex-wrap items-center justify-center
      p-3 rounded-xl border-2 border-coBlue2"
                        >
                          <p className="font-semibold">{item.childCate}</p>
                          <hr className="border-2 border-dashed border-coGray2 w-full my-2" />
                          <p>
                            <span className="font-bold text-coGreen">
                              {item.count}
                            </span>{" "}
                            bài tập
                          </p>
                        </li>
                      ))}
                  </ul>
                  <hr className="mt-4" />
                </li>
              );
            })}
        </ul>
      </div>
    </CardHomework>
  );
}
