import Card from "../UI/Card";
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

  useEffect(() => {
    fetchGetAppInfos();
  }, []);

  return (
    <>
      {isFetching && <Loading />}
      {!isFetching && (
        <Card>
          <LocalNotification localNoti={localNoti} />
          <div className="p-6 flex flex-col gap-6 relative">
            <Link className="btn-shape-back" href={backTo}>
              Trở lại
            </Link>
            <h1 className="">
              Phiên bản:{" "}
              <span className="text-coRed">{staticData.APP_VERSION}</span>
            </h1>

            <hr />
            {infos.length === 0 && <p>Chưa có thông tin.</p>}

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
        </Card>
      )}
    </>
  );
}
