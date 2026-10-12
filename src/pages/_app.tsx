import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import DefaultUserProvider from "@/context/loggedInUserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Songbook · Guitar chords & lyrics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f97316" />
      </Head>
      <DefaultUserProvider>
        <div
          className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans`}
        >
          <div className="sticky top-0 z-50 print:hidden">
            <NavBar />
          </div>
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </DefaultUserProvider>
    </>
  );
}
