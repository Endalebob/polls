import { store } from "<@>/app/store";
import Navigator from "<@>/components/Navigator";
import "<@>/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  return (
    
    <>
      <Provider store={store}>
        <ToastContainer/>
        <Navigator/>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
