import Image from "next/image";
import LocalNotification from "../../UI/LocalNotification";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  useLocalNotification,
  useAxiosInstance,
} from "../../../hooks/useHooks";
import { scrollToElementId, devErrorMessage } from "../../../helper/uti";
import { Howl } from "howler";

export default function Congratulation({ exerciseData, subscriptionInstance }) {
  scrollToElementId("#1");
  useEffect(() => {
    const winSound = new Howl({
      src: "/sounds/win.mp3",
      volume: 0.5,
    });
    winSound.play();
  }, []);

  const router = useRouter();
  const axiosInstance = useAxiosInstance();
  const subscriptionAuth = useSelector((state) => state.subscriptionAuth);
  const studentWork = subscriptionAuth.studentWork;

  const totalExercises = subscriptionInstance.getExercisesLength() || 0;
  const [isFetching, setIsFetching] = useState(false);
  //Biến quyết định submit cập nhật thành tích / cập nhật củng cố
  const isSubmitingConsolidate = router.asPath.includes("consolidate");
  const { localNoti, doSetLocalNotification, clearLocalNotification } =
    useLocalNotification();

  const percentageRightAnswer =
    (studentWork.rightAnswer / totalExercises) * 100;

  const award = (() => {
    if (studentWork.rightAnswer === 0) {
      return {
        imageUrl: "/assets/sad.gif",
        message: "Bé hãy cố gắng hơn vào lần sau nhé.",
      };
    }
    if (percentageRightAnswer <= 30) {
      return {
        imageUrl: "/assets/award3.gif",
        message: "Bé hãy cố gắng hơn vào lần sau nhé.",
      };
    }
    if (percentageRightAnswer <= 60) {
      return {
        imageUrl: "/assets/award3.gif",
        message: "Bé làm tốt lắm, hãy cố gắng hơn vào lần sau nhé.",
      };
    }
    if (percentageRightAnswer <= 80) {
      return {
        imageUrl: "/assets/award2.gif",
        message: "Bé làm rất tốt.",
      };
    }
    return {
      imageUrl: "/assets/award1.gif",
      message: "Bé thật xuất sắc.",
    };
  })();

  // Hàm submit kết quả thành tích
  const handleSubmit = async (e, submitType) => {
    e.preventDefault();
    let dataSubmit;
    if (submitType === "archivements") {
      dataSubmit = {
        noiDungMucTieu: exerciseData?.noiDungMucTieu || "",
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
    } else {
      dataSubmit = { ids: studentWork.rightAnswers || [] };
      if (dataSubmit.ids.length === 0) {
        doSetLocalNotification({
          status: 401,
          message: "Đầu vào cập nhật bài tập củng cố không hợp lệ.",
        });
        return;
      }
    }

    try {
      setIsFetching(true);
      const status =
        submitType === "archivements"
          ? await subscriptionInstance.updateArchivements({
              axiosInstance,
              dataSubmit,
            })
          : await subscriptionInstance.updateRedoExercises({
              axiosInstance,
              dataSubmit,
            });

      if (status === 200) {
        doSetLocalNotification({
          status: 200,
          message:
            submitType === "archivements"
              ? "Cập nhật thành tích thành công."
              : "Cập nhật bài tập củng cố thành công.",
        });
        setTimeout(() => {
          router.replace("/products");
        }, 2000);
      }
    } catch (err) {
      devErrorMessage({
        err,
        from: "/Components/Products/General/Congratulation.js",
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <form
      id="#1"
      className="flex flex-col gap-4 justify-center items-center
    text-4xl p-4"
      onSubmit={(e) =>
        handleSubmit(e, isSubmitingConsolidate ? "consolidate" : "archivements")
      }
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
