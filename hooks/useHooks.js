import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef } from "react";
import { AuthContext } from "../store/authContext";
import axios from "axios";
import { useSelector } from "react-redux";
import Account from "../classes/Account";

export const useProtect = () => {
  const { token, username, hocSinh } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/auth");
      return;
    }
  }, [token]);

  const validAccount = new Account(username, hocSinh, token);
  return validAccount;
  // return { username, hocSinh, token };
};

export const useAxiosInstance = (token) => {
  const instance = axios.create({
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  return instance;
};

export const useLoadHomework = () => {
  const homeworks = useSelector((state) => state.hwsRender.homeworks);
  const amountHomeworks = useSelector(
    (state) => state.hwsRender.amountHomeworks
  );
  const loadOrdinalNubmer = useSelector(
    (state) => state.hwsRender.loadOrdinalNubmer
  );

  let queryOrdinalNumber = null;
  if (loadOrdinalNubmer - amountHomeworks >= 1) {
    queryOrdinalNumber = amountHomeworks;
  } else {
    queryOrdinalNumber = loadOrdinalNubmer;
  }

  let homework = {};
  const targetHomework = homeworks.find(
    (homework) => +homework.ordinalNumber === +queryOrdinalNumber
  );
  if (targetHomework) homework = targetHomework;

  const validSubmit = loadOrdinalNubmer - amountHomeworks >= 1;

  return {
    homeworkData: homework,
    validSubmit,
    homeworkOrdinal: loadOrdinalNubmer,
    totalHomeworks: amountHomeworks,
  };
};
