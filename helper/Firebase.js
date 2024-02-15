import axios from "axios";

export const signIn = async ({ email, password, authCtx, router }) => {
  const fetchUrl = process.env.FIREBASE_AUTH;
  try {
    const response = await axios.post(fetchUrl, {
      email,
      password,
      returnSecureToken: true,
    });
    if (response.data) {
      console.log(response.data.email);
      authCtx.setAuth({
        token: response.data.idToken,
        email: response.data.email,
      });
      if (router) router.push("/exercises");
    } else {
      authCtx.setAuth({
        token: "",
        email: "",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
