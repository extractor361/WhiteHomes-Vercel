import "../public/assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import { useRouter } from "next/router";
import "./styles.css";
import "../styles/whitehomes-improvements.css";
import { appWithTranslation } from "next-i18next";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Provider as Alert} from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

import "photoswipe/dist/photoswipe.css";
import { store } from "../redux-toolkit/store";
import { Provider } from "react-redux";
import { withTranslateRoutes } from 'next-translate-routes'

import "react-toastify/dist/ReactToastify.css";
import Layout from "./layout";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);



return   <>
<Provider store={store}>
<Alert template={AlertMUITemplate}>
<Layout>{getLayout(<Component {...pageProps} />)}</Layout>
</Alert>
</Provider></>
}

export default withTranslateRoutes(appWithTranslation(MyApp));
