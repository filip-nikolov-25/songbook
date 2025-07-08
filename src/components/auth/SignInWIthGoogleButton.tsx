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
      className="rounded hover:shadow-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      {buttonText}
    </button>
  );
};

export default SignInWIthGoogleButton;