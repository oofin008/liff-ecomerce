import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from "react";

const LIFF_ID = process.env.LIFF_ID ?? "";

export default function App({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    ( async () => {
      console.log("start liff.init()...");
      const liff = (await import('@line/liff')).default
      try {
        await liff.init({ liffId: LIFF_ID });
      } catch (error: any) {
        console.error('liff init error', error.message);
        if (!process.env.liffId) {
          console.info(
            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
          );
        }
        setLiffError(error.toString());
      }
      console.log("liff.init() done");
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    })();
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />
}
