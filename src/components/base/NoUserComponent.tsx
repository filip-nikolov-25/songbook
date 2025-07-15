import Link from "next/link";
import React from "react";

const NoUserComponent = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-red-100 to-red-800 text-transparent bg-clip-text animate-fade-in">
        You are not logged in
      </h2>
      <p className="mt-4 text-2xl md:text-3xl text-center">
        Please sign in to access this page.
      </p>
      <p className="text-gray-400 mt-2 text-center">
        It looks like you're trying to visit a page that requires
        authentication.
      </p>
      <Link
        href="/signin"
        className="mt-6 px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition duration-300"
      >
        Join us Now
      </Link>
    </div>
  );
};

export default NoUserComponent;
