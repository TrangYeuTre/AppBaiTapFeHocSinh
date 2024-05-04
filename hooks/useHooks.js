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

// export function useAutoResizeTextarea() {
//   const textareaRef = useRef(null);

//   useEffect(() => {
//     function autoResize() {
//       const textarea = textareaRef.current;
//       if (textarea) {
//         textarea.style.height = "auto";
//         textarea.style.height = `${textarea.scrollHeight}px`;
//       }
//     }

//     function handleInput() {
//       autoResize();
//     }

//     const textarea = textareaRef.current;

//     if (textarea) {
//       autoResize(); // Initially set the height
//       textarea.addEventListener("input", handleInput); // Add event listener
//     }

//     return () => {
//       if (textarea) {
//         textarea.removeEventListener("input", handleInput); // Remove event listener
//       }
//     };
//   }, []);

//   return textareaRef;
// }
