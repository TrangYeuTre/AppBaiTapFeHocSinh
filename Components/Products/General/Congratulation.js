import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import {
  useLocalNotification,
  useAxiosInstance,
} from "../../../hooks/useHooks";
import LocalNotification from "../../UI/LocalNotification";
import { scrollToElementId } from "../../../helper/uti";

export default function Congratulation({ exerciseData, subscriptionInstance }) {
  scrollToElementId("#1");
  const subscriptionAuth = useSelector((state) => state.subscriptionAuth);
  const studentWork = subscriptionAuth.studentWork;
  const axiosInstance = useAxiosInstance();

  const totalExercises = subscriptionInstance.getExercisesLength() || 0;

  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);

  //Biến quyết định submit cập nhật thành tích / cập nhật củng cố
  const isSubmitingConsolidate = router.asPath.includes("consolidate");

  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();

  const percentageRightAnswer =
    (studentWork.rightAnswer / totalExercises) * 100;

  const award = { imageUrl: "", message: "" };
  if (studentWork.rightAnswer === 0) {
    award.imageUrl = "/assets/sad.gif";
    award.message = "Bé hãy cố gắng hơn vào lần sau nhé.";
  }

  if (percentageRightAnswer > 0 && percentageRightAnswer <= 30) {
    award.imageUrl = "/assets/award3.gif";
    award.message = "Bé hãy cố gắng hơn vào lần sau nhé.";
  }

  if (percentageRightAnswer > 30 && percentageRightAnswer <= 60) {
    award.imageUrl = "/assets/award3.gif";
    award.message = "Bé làm tốt lắm, hãy cố gắng hơn vào lần sau nhé.";
  }

  if (percentageRightAnswer > 60 && percentageRightAnswer <= 80) {
    award.imageUrl = "/assets/award2.gif";
    award.message = "Bé làm rất tốt.";
  }

  if (percentageRightAnswer > 80 && percentageRightAnswer <= 100) {
    award.imageUrl = "/assets/award1.gif";
    award.message = "Bé thật xuất sắc.";
  }

  const submitArchivements = async (e) => {
    e.preventDefault();
    const dataSubmit = {
      noiDungMucTieu:
        exerciseData && exerciseData.hasOwnProperty("noiDungMucTieu")
          ? exerciseData.noiDungMucTieu
          : "",
      thanhTich: studentWork.rightAnswer,
      tongSoBai: totalExercises,
      baiLamSai: studentWork.wrongAnswers,
    };
    if (
      !dataSubmit.noiDungMucTieu ||
      dataSubmit.thanhTich > 10 ||
      !dataSubmit.baiLamSai ||
      !dataSubmit.tongSoBai
    ) {
      doSetLocalNotification({
        status: 401,
        message: "Thành tích không hợp lệ.",
      });
      return;
    }
    //Submit thôi
    try {
      setIsFetching(true);
      //Cập nhật thành tích
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

  const submitConsolidate = async (e) => {
    e.preventDefault();
    const dataSubmit = { ids: studentWork.rightAnswers || [] };
    if (dataSubmit.ids.length === 0) {
      doSetLocalNotification({
        status: 401,
        message: "Đầu vào cập nhật bài tập củng cố không hợp lệ.",
      });
      return;
    }
    //Submit thôi
    try {
      setIsFetching(true);
      //Cập nhật thành tích
      const status = await subscriptionInstance.updateRedoExercises({
        axiosInstance,
        dataSubmit,
      });
      if (status === 200) {
        doSetLocalNotification({
          status: 200,
          message: "Cập nhật bài tập củng cố thành công.",
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
      id="#1"
      className="flex flex-col gap-4 justify-center items-center
    text-4xl p-4"
      onSubmit={isSubmitingConsolidate ? submitConsolidate : submitArchivements}
    >
      <p className="uppercase">
        Số câu đúng:{" "}
        <span className="font-bold text-coGreen">
          {studentWork.rightAnswer || 0}
        </span>
        / {totalExercises}
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
