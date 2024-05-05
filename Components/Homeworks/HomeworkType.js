import HomeworkTypeViet from "./Homework_Viet";
import HomeworkTypeDienKhuyet from "./Homework_DienKhuyet";
import HomeworkTypeMatching from "./Homework_Matching";
import HomeworkTypeTracNghiem from "./Homework_TracNghiem";

export default function HomeworkType({ homeworkData }) {
  const { type } = homeworkData;
  console.log(type);
  if (type === "viet") return <HomeworkTypeViet homeworkData={homeworkData} />;
  if (type === "matching")
    return <HomeworkTypeMatching homeworkData={homeworkData} />;
  if (type === "dienKhuyet")
    return <HomeworkTypeDienKhuyet homeworkData={homeworkData} />;
  if (type === "tracNghiem")
    return <HomeworkTypeTracNghiem homeworkData={homeworkData} />;
  return <p>Không tìm thấy kiểu bài tập để load.</p>;
}
