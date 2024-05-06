import HomeworkTypeViet from "./Homework_Viet";
import HomeworkTypeDienKhuyet from "./Homework_DienKhuyet";
import HomeworkTypeMatching from "./Homework_Matching";
import HomeworkTypeTracNghiem from "./Homework_TracNghiem";

export default function HomeworkType({ homeworkData, validSubmit, hocSinh }) {
  const { type } = homeworkData;
  if (type === "viet")
    return (
      <HomeworkTypeViet
        homeworkData={homeworkData}
        validSubmit={validSubmit}
        hocSinh={hocSinh}
      />
    );
  if (type === "matching")
    return (
      <HomeworkTypeMatching
        homeworkData={homeworkData}
        validSubmit={validSubmit}
        hocSinh={hocSinh}
      />
    );
  if (type === "dienKhuyet")
    return (
      <HomeworkTypeDienKhuyet
        homeworkData={homeworkData}
        validSubmit={validSubmit}
        hocSinh={hocSinh}
      />
    );
  if (type === "tracNghiem")
    return (
      <HomeworkTypeTracNghiem
        homeworkData={homeworkData}
        validSubmit={validSubmit}
        hocSinh={hocSinh}
      />
    );
  return <p>Không tìm thấy kiểu bài tập để load.</p>;
}
