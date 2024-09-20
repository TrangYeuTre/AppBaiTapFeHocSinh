import BottomMenu from "./General/BottomMenu";
import CardHomework from "../UI/CardHomework";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAxiosInstance } from "../../hooks/useHooks";
import { formatDateFillInput } from "../../helper/uti";
import staticData from "../../data/static.json";
import Image from "next/image";
import Loading from "../UI/Loading";

export default function Archivements() {
  const [archivementData, setArchivementData] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const axiosInstance = useAxiosInstance();

  useEffect(() => {
    getUserArchivements(axiosInstance);
  }, []);

  //Lấy thành tích
  const getUserArchivements = async (axiosInstance) => {
    if (!axiosInstance) return;
    const enviroment = process.env.NODE_ENV;
    const API_HOCSINH =
      enviroment === "development"
        ? staticData.API_HOCSINH_DEV
        : staticData.API_HOCSINH;

    const fetchUrl = API_HOCSINH + "/subscriptionAuth/archivements";
    try {
      setIsFetching(true);
      const response = await axiosInstance.get(fetchUrl);
      if (response.data && response.data.data) {
        setArchivementData(response.data.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  const archivements = archivementData.archivements || [];

  archivements.forEach((item) => (item.thanhTich = +item.thanhTich));
  const archivementsWithIconAward = archivements.map((item) => {
    let awardImageUrl = "";
    const percentageRightAnswer = (+item.thanhTich / +item.tongSoBai) * 100;
    if (percentageRightAnswer === 0) awardImageUrl = "/assets/sad.gif";
    if (percentageRightAnswer > 0 && percentageRightAnswer <= 60)
      awardImageUrl = "/assets/award3.gif";
    if (percentageRightAnswer > 60 && percentageRightAnswer <= 80)
      awardImageUrl = "/assets/award2.gif";
    if (percentageRightAnswer > 80 && percentageRightAnswer <= 100)
      awardImageUrl = "/assets/award1.gif";
    return { ...item, awardImageUrl };
  });

  return (
    <>
      <CardHomework>
        {isFetching && <Loading />}
        {!isFetching && (
          <div
            className="flex flex-col gap-4 justify-center items-center
    text-4xl py-4"
          >
            <p>
              Thành tích tài khoản:{" "}
              <span className="uppercase font-bold text-coGreen">
                {archivementData.username}
              </span>
            </p>
            <hr className="border-2 w-full border-dashed border-coBlue1 opacity-60" />
            <ul className="w-full">
              {archivementsWithIconAward.map((archivement) => (
                <li
                  key={Math.random()}
                  className="grid grid-cols-5 w-full !text-2xl border-b-2
              border-dashed border-coBlue1"
                >
                  <div className="col-span-1 my-2 flex justify-center items-center">
                    {formatDateFillInput(archivement.time)}
                  </div>
                  <div className="col-span-2 my-2 flex justify-center items-center">
                    {archivement.noiDungMucTieu}
                  </div>
                  <div className="col-span-1 my-2 flex justify-center items-center">
                    <span className="font-bold text-3xl text-coGreen mr-1">
                      {archivement.thanhTich}
                    </span>
                    / {archivement.tongSoBai}
                  </div>
                  <div className="col-span-1 my-2 flex justify-center items-center">
                    <Image
                      alt="award icon"
                      src={archivement.awardImageUrl}
                      width={60}
                      height={60}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardHomework>

      <BottomMenu
        navigations={[
          { name: "👜 Chọn bài tập", route: "/products" },
          { name: "✏️ Củng cố kiến thức", route: "/products/consolidate" },
        ]}
      />
    </>
  );
}
