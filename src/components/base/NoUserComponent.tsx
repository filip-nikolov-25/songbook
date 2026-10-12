import Icon from "@/components/base/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NoUserComponent = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center animate-fade-up">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
        <Icon name="user" className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Sign in to continue</h1>
      <p className="mt-3 max-w-md text-stone-500">
        You need an account to add and edit songs. It&apos;s free and takes one
        click with Google.
      </p>
      <Link
        href={`/signin?next=${encodeURIComponent(router.asPath)}`}
        className="btn-primary mt-8"
      >
        Sign in with Google
        <Icon name="arrowRight" className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default NoUserComponent;
