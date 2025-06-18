"use client";
import { auth, signInWithGoogle } from "@/firebase";
import { saveUser } from "@/functions/userService";
import React from "react";

const SignInWIthGoogleButton = () => {
    const user = auth.currentUser;
  return (
    <button
      onClick={() => {
        signInWithGoogle()
        saveUser(user?.email)
      }}
      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Sign in with Google
    </button>
  );
};

export default SignInWIthGoogleButton;
