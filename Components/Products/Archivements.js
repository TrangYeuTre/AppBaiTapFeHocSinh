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

  const token = useSelector((state) => state.subscriptionAuth.token);
  const axiosInstance = useAxiosInstance(token);

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
                <li className="archivement-item-wrapper">
                  <div className="archivement-item-1slot">
                    {formatDateFillInput(archivement.time)}
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
