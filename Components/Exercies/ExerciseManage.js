import Card from "../UI/Card";
import ExerciseGroup from "./ExerciseGroup";
import StudentInfo from "../UI/StudentInfo";
import LocalError from "../UI/LocalError";
import Homeworks from "../../classes/Homeworks";
import Modal from "../../Components/modal/Modal";
import NotiUpdatingStore from "../UI/NotiUpdatingStore";
import ExerciseActionsBar from "./ExerciseActionsBar";
import { useAxiosInstance } from "../../hooks/useHooks";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ExerciseManage({ username, hocSinh }) {
  const homeworks = useSelector((state) => state.hws.hws);
  const updatingStore = useSelector((state) => state.hws.updatingStore);
  const token = useSelector((state) => state.auth.token);
  const axiosInstance = useAxiosInstance(token);

  const instanceHomeworks = new Homeworks(homeworks);
  const baiTapVeNhaRender = instanceHomeworks.getBaiTapVeNhaRender();

  const [error, setError] = useState({
    init: true,
    message: "",
  });

  if (!homeworks || homeworks.length === 0)
    return (
      <Card plusStyle="w-1/2">
        <div>
          <p>Chưa có bài tập được giao 😎😎😎</p>
          <p>Bé hãy trở lại sau nhé.</p>
          <button></button>
        </div>
      </Card>
    );

  return (
    <section className="content-wrapper">
      {updatingStore && (
        <Modal>
          <NotiUpdatingStore />
        </Modal>
      )}
      <StudentInfo username={username} />
      <ul className="exercises-main-list">
        {baiTapVeNhaRender.length > 0 &&
          baiTapVeNhaRender.map((hw) => (
            <div key={Math.random().toString() + hw._id.toString()}>
              <hr />
              <ExerciseGroup hw={hw} instanceHomeworks={instanceHomeworks} />
            </div>
          ))}
      </ul>
      {!error.init && error.message && (
        <LocalError errorMessage={error.message} />
      )}
      <hr className="my-2" />

      {/* <button className="btn btn-submit" onClick={submitHomeworks}>
        <p className="uppercase font-bold">Nộp bài</p>
      </button> */}
      <ExerciseActionsBar />
    </section>
  );
}
