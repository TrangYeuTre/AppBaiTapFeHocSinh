import { useEffect } from "react";
import { useProtect, useAxiosInstance } from "../../hooks/useHooks";
import { getAvailableHomeworks1Student } from "../../helper/axiosApi";
import ExerciseManage from "../../Components/Exercies/ExerciseManage";
import { useDispatch } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";

export default function ExerciesRoute() {
  const dispatch = useDispatch();
  //Kiểm tra xem có quyền truy cập nội dung không
  //Lấy về username để render tiêu đề cho học sinh thấy tên mình
  const { username, hocSinh, token } = useProtect();
  const axiosInstance = useAxiosInstance(token);

  useEffect(() => {
    doFetchExs({ hocSinh, axiosInstance, dispatch });
  }, [hocSinh]);

  return <ExerciseManage username={username} hocSinh={hocSinh} />;
}

//CB fetch lấy data bài tập
const doFetchExs = async ({ hocSinh, axiosInstance, dispatch }) => {
  if (!hocSinh) return;
  const hws = await getAvailableHomeworks1Student({
    id: hocSinh,
    axiosInstance,
  });
  //function trên giữ nguyên để tái sử dụng khi bấm nút
  dispatch(HwsActions.setHws(hws));
};
