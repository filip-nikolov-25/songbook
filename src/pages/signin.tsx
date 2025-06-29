import SignInWIthGoogleButton from "@/components/SignInWIthGoogleButton";
import { DefaultUserContext } from "@/context/loggedInUserContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const SignIn = () => {
  const { currentUser } = useContext(DefaultUserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectPage, setRedirectPage] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsModalOpen(true);
      return;
    }
    if (localStorage.getItem("newUser")) {
      return;
    }

    if (currentUser) {
      localStorage.setItem("newUser", "true");
      setIsModalOpen(true);
    }
  }, [currentUser]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
       router.push("/allsongs");
  };

  useEffect(() => {
    if (isModalOpen ) {
      const interval = setInterval(() => {
        setRedirectPage((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isModalOpen]);

  return (
    <div className="py-28 relative bg-black bg-gradient-to-br from-gray-700 via-black to-gray-800 flex items-center justify-center">
      <div className="w-8/12 p-10 py-56 rounded-2xl border border-white/50 bg-white/10 backdrop-blur-md shadow-2xl text-white">
        <h2 className="font-bold text-5xl mb-10 text-center">
          Your music belongs here
        </h2>
        <p className="text-2xl mb-14">
          Join a passionate community of guitarists for free and share your
          favorite songs with those who play together.
        </p>
        <div className="text-center text-red-400">
          <SignInWIthGoogleButton buttonText="Join Us Now" />
        </div>
      </div>
      {isModalOpen && currentUser && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <div className="fixed z-50 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-10 top-[15%] w-11/12 max-w-2xl mx-auto text-center text-white shadow-2xl">
            <p className="text-3xl mb-5 font-bold">Login successful!</p>
            {localStorage.getItem("user") ? (
              <p className="text-3xl mb-5 font-bold">Welcome Back</p>
            ) : (
              <p className="text-3xl mb-5">Welcome to the community</p>
            )}
            <p className="text-5xl font-bold mb-6">{currentUser.displayName}</p>
            <p className="mb-4">
              You can now dive into the community and start adding your favorite
              songs.
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 mb-5 px-6 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg shadow"
            >
              Close
            </button>
            <p>Redirecting in <span className="text-red-500 font-bold">{redirectPage}</span></p>
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
