import { useEffect, useState } from "react";
import {
  useProtect,
  useAxiosInstance,
  useMainternance,
} from "../../hooks/useHooks";
import { getAvailableHomeworks1Student } from "../../helper/axiosApi";
import { useDispatch } from "react-redux";
import { HwsRenderActions } from "../../store/hwsRenderSlice";
import { HwsActions } from "../../store/hwsSlice";
import { useRouter } from "next/router";
import HomeworksStack from "../../classes/HomeworksStack";
import HomeworksManage from "../../Components/Homeworks/HomeworksManage";
import Loading from "../../Components/UI/Loading";

export default function ExerciesRoute() {
  useMainternance();
  const dispatch = useDispatch();
  const router = useRouter();
  const validAccount = useProtect();
  const { hocSinh, token, username } = validAccount;

  const [readyStore, setReadyStore] = useState(false);

  const axiosInstance = useAxiosInstance(token);

  useEffect(() => {
    doFetchExs({ hocSinh, axiosInstance, dispatch, router, setReadyStore });
  }, [hocSinh]);

  if (!readyStore) return <Loading />;

  return <HomeworksManage username={username} hocSinh={hocSinh} />;
}

const doFetchExs = async ({
  hocSinh,
  axiosInstance,
  dispatch,
  router,
  setReadyStore,
}) => {
  if (!hocSinh) return;
  const homeworks = await getAvailableHomeworks1Student({
    id: hocSinh,
    axiosInstance,
    router,
  });
  const newHomeworksRender = new HomeworksStack({})
    .createInitHomeworksRender(homeworks)
    .getCoreData();
  dispatch(HwsRenderActions.setHomeworksRender(newHomeworksRender));
  dispatch(HwsActions.setHws(homeworks));
  setReadyStore(true);
};
