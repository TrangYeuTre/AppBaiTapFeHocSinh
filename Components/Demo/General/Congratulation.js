import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import {
  useLocalNotification,
  useAxiosInstance,
} from "../../../hooks/useHooks";
import LocalNotification from "../../UI/LocalNotification";
import { scrollToElementId } from "../../../helper/uti";
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

  const subscriptionAuth = useSelector((state) => state.subscriptionAuth);
  const studentWork = subscriptionAuth.studentWork;

  const totalExercises = subscriptionInstance.getExercisesLength() || 0;

  const router = useRouter();

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

  const endPackage = (e) => {
    e.preventDefault();
    router.replace("/demo");
  };

  return (
    <form
      id="#1"
      className="flex flex-col gap-4 justify-center items-center
    text-4xl p-4"
      onSubmit={endPackage}
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
        Tiếp theo
      </button>
      <LocalNotification localNoti={localNoti} />
    </form>
  );
}
