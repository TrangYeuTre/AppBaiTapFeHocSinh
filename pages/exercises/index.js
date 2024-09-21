import { useEffect } from "react";
import {
  useProtect,
  useAxiosInstance,
  useMainternance,
} from "../../hooks/useHooks";
import { getAvailableHomeworks1Student } from "../../helper/axiosApi";
import ExerciseManage from "../../Components/Exercies/ExerciseManage";
import { useDispatch } from "react-redux";
import { HwsActions } from "../../store/hwsSlice";
import { useRouter } from "next/router";

export default function ExerciesRoute() {
  useMainternance();
  const dispatch = useDispatch();
  const router = useRouter();
  const validAccount = useProtect();
  const { hocSinh, token, username } = validAccount;

  const axiosInstance = useAxiosInstance(token);

  useEffect(() => {
    doFetchExs({ hocSinh, axiosInstance, dispatch, router });
  }, [hocSinh]);

  return <ExerciseManage username={username} hocSinh={hocSinh} />;
}

const doFetchExs = async ({ hocSinh, axiosInstance, dispatch, router }) => {
  if (!hocSinh) return;
  const homeworks = await getAvailableHomeworks1Student({
    id: hocSinh,
    axiosInstance,
    router,
  });
  dispatch(HwsActions.setHws(homeworks));
};
