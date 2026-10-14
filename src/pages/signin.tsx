import SignInWIthGoogleButton from "@/auth/SignInWIthGoogleButton";
import Icon from "@/components/base/Icon";
import Loading from "@/components/base/Loading";
import { DefaultUserContext } from "@/context/loggedInUserContext";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const PERKS = [
  "Add songs with chords in minutes",
  "Edit and manage the songs you share",
  "Transpose, autoscroll and print any song",
];

const SignIn = () => {
  const { currentUser, authLoading } = useContext(DefaultUserContext);
  const router = useRouter();
  const next = typeof router.query.next === "string" && router.query.next.startsWith("/")
    ? router.query.next
    : "/library?tab=mine";

  if (authLoading) return <Loading />;

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
      <Head>
        <title>Sign in · Songbook</title>
      </Head>
      <div className="card mx-auto w-full max-w-md p-8 sm:p-10 animate-fade-up">
        {currentUser ? (
          <>
            {currentUser.photoURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentUser.photoURL}
                alt=""
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-full ring-4 ring-orange-100"
              />
            )}
            <h1 className="mt-6 text-3xl font-bold">
              Welcome, {currentUser.displayName?.split(" ")[0] || "musician"}!
            </h1>
            <p className="mt-2 text-stone-500">You&apos;re signed in and ready to play.</p>
            <div className="mt-8 grid gap-3">
              <Link href="/addsong" className="btn-primary">
                <Icon name="plus" className="h-4 w-4" />
                Add a song
              </Link>
              <Link href="/allsongs" className="btn-secondary">
                Browse songs
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-orange-400 to-orange-600 text-white shadow-md shadow-orange-500/30">
              <Icon name="music" className="h-6 w-6" />
            </span>
            <h1 className="mt-6 text-3xl font-bold">Your music belongs here</h1>
            <p className="mt-2 text-stone-500">
              Join a community of guitarists for free and share the songs you
              love to play.
            </p>
            <ul className="mt-6 space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-stone-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <SignInWIthGoogleButton onSignedIn={() => router.push(next)} />
            </div>
            <p className="mt-4 text-center text-xs text-stone-400">
              We only use your name and photo to show who added a song.
            </p>
          </>
        )}
      </div>

      <div className="relative hidden aspect-square overflow-hidden rounded-4xl shadow-2xl shadow-orange-900/20 lg:block">
        <Image
          src="/Images/ManPlayingAcousticGuitar.jpg"
          alt="Man playing an acoustic guitar"
          fill
          sizes="560px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-orange-900/60 via-transparent to-transparent" />
        <p className="absolute bottom-8 left-8 right-8 text-2xl font-semibold text-white">
          &ldquo;The best songbook is the one everyone can add to.&rdquo;
        </p>
      </div>
    </div>
  );
};

export default SignIn;
