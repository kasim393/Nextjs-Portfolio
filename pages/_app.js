import Layout from "../components/Layout";
import "../styles/globals.css";
import { motion } from "framer-motion";
function MyApp({ Component, pageProps, router }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
