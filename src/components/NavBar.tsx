import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
const NavBar = () => {
  const [isClicked, setIsClicked] = useState<number>(0);
  const router = useRouter()
  console.log(router.asPath,"ruter")
  return (
    <div className="font-bold  border-b-2 border-white text-white">
      {/* <div className="py-2 bg-gradient-to-r from-[#751006] to-[#1f0021]">
        <div className="w-11/12 mx-auto">
          <span>E-mail:filip.nikolov1010@gmail.com</span>
        </div>
      </div> */}
      <div className={ `${router.asPath === "/" ? "bg-gradient-to-b from-black to-red-900" : "bg-gradient-to-r from-[#751006] to-[#1f0021]" } `}>
        <div className="w-11/12 mx-auto">
          <div className="justify-between pb-5  pt-6 flex">
            <Link href={"/"}>
              <i
                className={`fa-solid fa-guitar text-3xl hover:text-white  cursor-pointer text-gray-300 ${
                  isClicked === 0 ? "shadow-white text-white " : "shadow-slate-900"
                } hover:shadow-white shadow-lg  backdrop-blur-3xl backdrop-brightness-50 px-3 py-1 rounded-3xl`}
                onClick={() => setIsClicked(0)}
              ></i>
            </Link>
            <ul className="flex text-gray-300">
              <Link href={"/searchsong"}>
                <li
                  onClick={() => setIsClicked(1)}
                  className={`mr-5 mt-1 border-b-2 hover:text-white border-white rounded-b-xl px-5 py-1 cursor-pointer ${
                    isClicked === 1 ? "shadow-white text-white" : "shadow-slate-600"
                  } hover:shadow-white shadow-xl backdrop-blur-md backdrop-brightness-75`}
                >
                  View songs
                </li>
              </Link>
              <Link href={"/joinus"}>
                <li
                  onClick={() => setIsClicked(2)}
                  className={`mr-5 mt-1 rounded-b-xl hover:text-white border-b-2 px-5 py-1 cursor-pointer ${
                    isClicked === 2 ? "shadow-white text-white" : "shadow-slate-600"
                  } hover:shadow-slate-100 shadow-xl backdrop-blur-md backdrop-brightness-75`}
                >
                  Join Us
                </li>
              </Link>
              <Link href={"/addsong"}>
                <li
                  onClick={() => setIsClicked(3)}
                  className={`mr-5 mt-1 rounded-b-xl hover:text-white border-b-2 px-5 py-1 cursor-pointer ${
                    isClicked === 3 ? "shadow-white text-white" : "shadow-slate-600"
                  } hover:shadow-slate-100 shadow-xl backdrop-blur-md backdrop-brightness-75`}
                >
                  Add your song
                </li>
              </Link>
              {/* <Link href={"/contact"}>
                <li
                  onClick={() => setIsClicked(4)}
                  className={` mt-1 rounded-b-xl hover:text-white border-b-2 px-5 py-1 cursor-pointer ${
                    isClicked === 4 ? "shadow-white text-white" : "shadow-slate-600"
                  } hover:shadow-slate-100 shadow-xl backdrop-blur-md backdrop-brightness-75`}
                >
                  Contact Us
                </li>
              </Link> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
