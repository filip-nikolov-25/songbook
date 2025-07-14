import { DefaultUserContext } from "@/context/loggedInUserContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const { currentUser } = useContext(DefaultUserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      localStorage.removeItem("newUser");
    } catch (error) {
      console.error("Error sign out:", error);
    }
  };

  return (
    <div className="font-bold border-b-2 border-white text-white">
      <div
        className={`${
          router.asPath === "/"
            ? "bg-gradient-to-b from-black to-red-900"
            : "bg-gradient-to-r from-[#751006] to-[#1f0021]"
        }`}
      >
        <div className="w-11/12 mx-auto">
          <div className="justify-between pb-5 pt-6 flex">
            <Link href={"/"}>
              <i
                className={`fa-solid fa-guitar text-3xl hover:text-white cursor-pointer text-gray-300 ${
                  router.asPath === "/"
                    ? "shadow-white text-white"
                    : "shadow-slate-900"
                } hover:shadow-white shadow-lg backdrop-blur-3xl backdrop-brightness-50 px-3 py-1 rounded-3xl`}
              ></i>
            </Link>

            <ul className="flex text-gray-300">
              <Link href={"/allsongs"}>
                <li
                  className={`mr-5 mt-1 rounded-b-xl hover:text-white border-b-2 px-5 py-1 cursor-pointer ${
                    router.asPath === "/allsongs"
                      ? "shadow-white text-white"
                      : "shadow-slate-600"
                  } hover:shadow-slate-100 shadow-xl backdrop-blur-md backdrop-brightness-75`}
                >
                  All Songs
                </li>
              </Link>
             
              {
                (!currentUser && (
                  <Link href={"/signin"}>
                    <li
                      onClick={handleLogout}
                      className={`mr-5 mt-1 rounded-b-xl hover:text-white border-b-2 px-5 py-1 cursor-pointer ${
                        router.asPath === "/signin"
                          ? "shadow-white text-white"
                          : "shadow-slate-600"
                      } hover:shadow-slate-100 shadow-xl backdrop-blur-md backdrop-brightness-75`}
                    >
                      Join Us
                    </li>
                  </Link>
                ))}

              <Link href={"/addsong"}>
                <li
                  className={`mr-5 mt-1 rounded-b-xl hover:text-white border-b-2 px-5 py-1 cursor-pointer ${
                    router.asPath === "/addsong"
                      ? "shadow-white text-white"
                      : "shadow-slate-600"
                  } hover:shadow-slate-100 shadow-xl backdrop-blur-md backdrop-brightness-75`}
                >
                  Add your song
                </li>
              </Link>
              {currentUser && (
                <li
                onClick={handleLogout}
                  className={`mr-5 mt-1 rounded-b-xl shadow-xl  shadow-red-500 border-b-2 px-5 py-1 cursor-pointer
0"
                   hover:text-red-500 border-red-500  backdrop-blur-md backdrop-brightness-75`}
                >
                  Sign out
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
