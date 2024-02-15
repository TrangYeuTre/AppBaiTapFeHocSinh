import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext({
  auth: { token: "", email: "" },
  setAuth: () => {},
});

export default function AuthProvider({ children }) {
  const [auth, changeAuth] = useState({ token: "", email: "" });

  const setAuthHandler = (data) => {
    changeAuth((preState) => {
      return { ...preState, token: data.token, email: data.email };
    });
    //Lưu local
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
  };

  const value = {
    auth,
    setAuth: setAuthHandler,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
