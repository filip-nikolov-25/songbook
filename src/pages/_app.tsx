import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/603ccb1d0d.js"
          async
          crossOrigin="anonymous"
        ></script>{" "}
      </Head>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <Component {...pageProps} />
    </>
  );
}
