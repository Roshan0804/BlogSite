import "../styles/globals.css";
import "../styles/style.css";
import AOS from "aos";

import "aos/dist/aos.css"; // You can also use <link> for styles
import { useEffect } from "react";
// ..
import AppContextComponent from "../contexts/appContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, [AOS.refresh()]);
  return (
    <AppContextComponent>
      <Component {...pageProps} />
      <ToastContainer />
    </AppContextComponent>
  );
}

export default MyApp;
