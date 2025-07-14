"use client";
import { DefaultUserContext } from "@/context/loggedInUserContext";
import { signInWithGoogle } from "@/firebase";
import { saveUser } from "@/functions/userService";
import React, { useContext } from "react";

interface Props {
  buttonText?: string;
}

const SignInWIthGoogleButton = ({
  buttonText = "Sign in with Google ",
}: Props) => {
  const { setCurrentUser } = useContext(DefaultUserContext);

  const handleSignIn = async () => {
    const result = await signInWithGoogle();

    if (result) {
      saveUser(result?.email);
      setCurrentUser(result);
      console.log(result, "USER FROM BUTTON");
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className="rounded px-5 py-2 text-white font-semibold bg-gradient-to-b from-red-500 to-red-700 shadow-2xl shadow-red-500 transition-all duration-300 ease-in transform hover:scale-105"
    >
      {buttonText}
    </button>
  );
};

export default SignInWIthGoogleButton;
