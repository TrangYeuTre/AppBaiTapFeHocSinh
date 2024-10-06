import CardHomework from "../UI/CardHomework";
import staticData from "../../data/static.json";
import Image from "next/image";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { useAxiosInstance } from "../../hooks/useHooks";
import {
  formatDateView,
  devErrorMessage,
  checkErrorAndRedirectLogin,
} from "../../helper/uti";

export default function Archivements() {
  const axiosInstance = useAxiosInstance();
  const router = useRouter();
  const [archivementData, setArchivementData] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
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
        devErrorMessage({
          err,
          from: "/Components/Products/Archivements.js",
        });
        checkErrorAndRedirectLogin({
          err,
          router,
        });
      } finally {
        setIsFetching(false);
      }
    };

    getUserArchivements(axiosInstance);
  }, []);

  const archivementsWithIconAward = useMemo(() => {
    const archivements = archivementData?.archivements || [];

    return archivements.map((item) => {
      item.thanhTich = +item.thanhTich || 0;
      let awardImageUrl = "";

      const percentageRightAnswer =
        item?.tongSoBai && +item.tongSoBai > 0
          ? (+item.thanhTich / +item.tongSoBai) * 100
          : 0;

      if (percentageRightAnswer === 0) awardImageUrl = "/assets/sad.gif";
      else if (percentageRightAnswer <= 60)
        awardImageUrl = "/assets/award3.gif";
      else if (percentageRightAnswer <= 80)
        awardImageUrl = "/assets/award2.gif";
      else awardImageUrl = "/assets/award1.gif";

      return { ...item, awardImageUrl };
    });
  }, [archivementData]);

  return (
    <>
      {isFetching && <Loading />}

      {!isFetching && (
        <CardHomework>
          <div className="archivement-wrapper">
            <h1>
              Thành tích tài khoản:{" "}
              <span className="uppercase font-bold text-coGreen">
                {archivementData.username}
              </span>
            </h1>
            <hr className="!w-full !my-0" />
            <ul className="w-full px-2">
              {archivementsWithIconAward.map((archivement) => (
                <li
                  className="archivement-item-wrapper"
                  key={Math.random() + archivement.time}
                >
                  <div className="archivement-item-1slot">
                    {formatDateView(archivement.time)}
                  </div>
                  <div className="archivement-item-2slot">
                    {archivement.noiDungMucTieu}
                  </div>
                  <div className="archivement-item-1slot">
                    <span className="font-bold text-coGreen mr-1">
                      {archivement.thanhTich}
                    </span>
                    / {archivement.tongSoBai}
                  </div>
                  <div className="archivement-item-1slot">
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
        </CardHomework>
      )}
    </>
  );
}
