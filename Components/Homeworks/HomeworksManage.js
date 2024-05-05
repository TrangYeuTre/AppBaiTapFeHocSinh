import { useLoadHomework } from "../../hooks/useHooks";
import HomeworkType from "./HomeworkType";

export default function HomeworksManage() {
  const { homeworkData } = useLoadHomework();

  if (Object.keys(homeworkData).length === 0) return <p>Chưa có bài tập</p>;

  return <HomeworkType homeworkData={homeworkData} />;
}
