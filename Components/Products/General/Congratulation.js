import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import {
  useLocalNotification,
  useAxiosInstance,
} from "../../../hooks/useHooks";
import LocalNotification from "../../UI/LocalNotification";

export default function Congratulation({ exerciseData, subscriptionInstance }) {
  const subscriptionAuth = useSelector((state) => state.subscriptionAuth);
  const studentWork = subscriptionAuth.studentWork;
  const token = subscriptionAuth.token;
  const axiosInstance = useAxiosInstance(token);

  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);

  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();

  const award = { imageUrl: "", message: "" };
  if (studentWork.rightAnswer === 0) {
    award.imageUrl = "/assets/sad.gif";
    award.message = "Bé hãy cố gắng hơn vào lần sau nhé.";
  }

  if (studentWork.rightAnswer > 0 && studentWork.rightAnswer <= 3) {
    award.imageUrl = "/assets/award3.gif";
    award.message = "Bé hãy cố gắng hơn vào lần sau nhé.";
  }

  if (studentWork.rightAnswer >= 4 && studentWork.rightAnswer <= 6) {
    award.imageUrl = "/assets/award3.gif";
    award.message = "Bé làm tốt lắm, hãy cố gắng hơn vào lần sau nhé.";
  }

  if (studentWork.rightAnswer >= 7 && studentWork.rightAnswer <= 8) {
    award.imageUrl = "/assets/award2.gif";
    award.message = "Bé làm rất tốt.";
  }

  if (studentWork.rightAnswer >= 9 && studentWork.rightAnswer <= 10) {
    award.imageUrl = "/assets/award1.gif";
    award.message = "Bé thật xuất sắc.";
  }

  // const goToLoadExercises = () => router.replace("/products");

  const submitArchivements = async (e) => {
    e.preventDefault();
    const dataSubmit = {
      noiDungMucTieu:
        exerciseData && exerciseData.hasOwnProperty("noiDungMucTieu")
          ? exerciseData.noiDungMucTieu
          : "",
      thanhTich: studentWork.rightAnswer,
      baiLamSai: studentWork.wrongAnswers,
    };
    if (
      !dataSubmit.noiDungMucTieu ||
      dataSubmit.thanhTich > 10 ||
      !dataSubmit.baiLamSai
    )
      doSetLocalNotification({
        status: 401,
        message: "Thành tích không hợp lệ.",
      });
    //Submit thôi
    try {
      setIsFetching(true);
      const status = await subscriptionInstance.updateArchivements({
        axiosInstance,
        dataSubmit,
      });
      if (status === 200) {
        doSetLocalNotification({
          status: 200,
          message: "Cập nhật thành tích thành công.",
        });
        setTimeout(() => {
          router.replace("/products");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 justify-center items-center
    text-4xl p-4"
      onSubmit={submitArchivements}
    >
      <p className="uppercase">
        Số câu đúng:{" "}
        <span className="font-bold text-coGreen">
          {studentWork.rightAnswer || 0}
        </span>
        /10
      </p>
      <Image
        alt="award"
        src={award.imageUrl || "/assets/sad.gif"}
        width={150}
        height={150}
      />
      <p className="text-3xl text-coRed text-center">{award.message}</p>
      <button className="btn-shape btn-shape-submit mt-4" type="submit">
        {isFetching ? "Cập nhật thành tích..." : "Tiếp theo"}
      </button>
      <LocalNotification localNoti={localNoti} />
    </form>
  );
}
