import "../styles/globals.css";
import Layout from "../Components/layout/layout";
import AuthProvider from "../store/authContext";
import store from "../store/store";
import { Provider } from "react-redux";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </AuthProvider> */}
    </Provider>
  );
}

export default MyApp;
