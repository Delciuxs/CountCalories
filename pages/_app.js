import "../styles/globals.css";
import Head from "next/head";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [details, setDetails] = useState(null);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Count Calories</title>
      </Head>
      <Component {...pageProps} details={details} setDetails={setDetails} />
    </>
  );
}

export default MyApp;
