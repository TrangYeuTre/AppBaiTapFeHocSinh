import "../styles/globals.css";
import Layout from "../Components/layout/layout";
import AuthProvider from "../store/authContext";
import store from "../store/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      {/* </AuthProvider> */}
    </Provider>
  );
}

export default MyApp;
