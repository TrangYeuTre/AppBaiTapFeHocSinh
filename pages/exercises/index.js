import ExerciseManage from "../../Components/Exercies/ExerciseManage";
import useProtect from "../../hooks/useProtect";
import Exercie from "../../model/Exercise";

export default function ExerciesRoute() {
  //Kiểm tra xem có quyền truy cập nội dung không
  const email = useProtect();

  //Dummy data
  const dummy = [
    new Exercie(
      "Cánh con vịt",
      "Một con vịt có 2 cái canh, hỏi 3 con vịt có mấy cái cánh",
      "https://images.unsplash.com/photo-1610834298273-a2ec97ba979d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "Toán đố",
      6,
      "Toán",
      "Lớp 3",
      "đã nộp",
      true
    ),
    new Exercie(
      "Mô tả dòng sông",
      "Hãy viết một đoạn văn ngắn mô tả dòng sông như hình trên",
      "https://images.unsplash.com/photo-1689245773324-7a73a0d0d208?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "Mô tả",
      "",
      "Tiếng Việt",
      "Lớp 5",
      "đã nhận",
      false
    ),
  ];

  return <ExerciseManage exercises={dummy} />;
}
