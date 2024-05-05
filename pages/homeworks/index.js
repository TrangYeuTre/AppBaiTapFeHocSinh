import { useEffect } from "react";
import { useProtect, useAxiosInstance } from "../../hooks/useHooks";
import { getAvailableHomeworks1Student } from "../../helper/axiosApi";
import { useDispatch } from "react-redux";
import { HwsRenderActions } from "../../store/hwsRenderSlice";
import { useRouter } from "next/router";
import HomeworksStack from "../../classes/HomeworksStack";
import HomeworksManage from "../../Components/Homeworks/HomeworksManage";

export default function ExerciesRoute() {
  const dispatch = useDispatch();
  const router = useRouter();
  const validAccount = useProtect();
  const { hocSinh, token, username } = validAccount;

  const axiosInstance = useAxiosInstance(token);

  useEffect(() => {
    doFetchExs({ hocSinh, axiosInstance, dispatch, router });
  }, [hocSinh]);

  return <HomeworksManage username={username} hocSinh={hocSinh} />;
}

const doFetchExs = async ({ hocSinh, axiosInstance, dispatch, router }) => {
  if (!hocSinh) return;
  const homeworks = await getAvailableHomeworks1Student({
    id: hocSinh,
    axiosInstance,
    router,
  });
  const newHomeworksRender = new HomeworksStack({})
    .createInitHomeworksRender(homeworks)
    .getCoreData();
  console.log(newHomeworksRender);
  dispatch(HwsRenderActions.setHomeworksRender(newHomeworksRender));
};
