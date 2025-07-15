import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Custom404() {
  const [counter, setCounter] = useState(5);
  const router = useRouter();
  useEffect(() => {
    if (counter === 0) {
      router.push("/");
    }
    const interval = setInterval(() => {
      setCounter((prevState) => prevState - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-7xl font-bold bg-gradient-to-r from-red-500 via-red-100 to-red-800 text-transparent bg-clip-text animate-fade-in">
        404
      </h1>
      <p className="mt-4 text-2xl md:text-3xl text-center">
        Oops! This page does not exist.
      </p>
      <p className="text-gray-400 mt-2 text-center">
        The page you're looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition duration-300"
      >
        Go Home
      </Link>
    <p className="mt-4 text-lg underline-offset-8 underline text-gray-500">
        Redirecting in <span className="text-red-400 font-semibold">{counter}</span>...
      </p>
    </div>
  );
}
