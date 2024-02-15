import "../styles/globals.css";
import Layout from "../Components/layout/layout";
import AuthProvider from "../store/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
