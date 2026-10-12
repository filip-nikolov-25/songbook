import Icon, { IconName } from "@/components/base/Icon";
import SongCard from "@/components/SongCard";
import { DefaultUserContext } from "@/context/loggedInUserContext";
import { getFavorites } from "@/functions/favorites";
import { clearRecent, getRecent } from "@/functions/library";
import { getAllSongs } from "@/functions/userService";
import { SongSummary } from "@/types/types";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

type Tab = "favorites" | "recent" | "mine";

const TABS: { value: Tab; label: string; icon: IconName }[] = [
  { value: "favorites", label: "Favorites", icon: "heart" },
  { value: "recent", label: "Recently viewed", icon: "clock" },
  { value: "mine", label: "My songs", icon: "user" },
];

const EMPTY_TEXT: Record<Tab, string> = {
  favorites: "Tap the heart on any song to save it here.",
  recent: "Songs you open will show up here.",
  mine: "Songs you add will show up here.",
};

const Library = () => {
  const router = useRouter();
  const { currentUser, authLoading } = useContext(DefaultUserContext);
  const tab = (router.query.tab as Tab) || "favorites";
  const [favorites, setFavorites] = useState<SongSummary[] | null>(null);
  const [recent, setRecent] = useState<SongSummary[]>([]);
  const [mine, setMine] = useState<SongSummary[] | null>(null);

  useEffect(() => {
    setRecent(getRecent());
  }, []);

  useEffect(() => {
    setFavorites(null);
    if (tab !== "favorites" || !currentUser) return;
    getFavorites(currentUser.uid).then(setFavorites);
  }, [tab, currentUser]);

  useEffect(() => {
    if (tab !== "mine" || !currentUser) return;
    getAllSongs().then((songs) =>
      setMine(
        songs
          .filter((song) => song.authorId === currentUser.uid)
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      )
    );
  }, [tab, currentUser]);

  const songs = { favorites: favorites || [], recent, mine: mine || [] }[tab];
  const needsAccount = tab !== "recent";
  const isLoading =
    needsAccount &&
    (authLoading ||
      (currentUser && (tab === "favorites" ? favorites : mine) === null));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Head>
        <title>Library · Songbook</title>
      </Head>
      <h1 className="text-4xl font-bold tracking-tight">Your library</h1>
      <p className="mt-2 text-stone-500">
        Favorites are saved to your account. Recently viewed songs are kept
        in this browser.
      </p>

      <div className="mt-8 flex gap-1 overflow-x-auto rounded-full bg-stone-100 p-1 sm:inline-flex">
        {TABS.map((item) => (
          <button
            key={item.value}
            onClick={() =>
              router.replace({ query: { tab: item.value } }, undefined, { shallow: true })
            }
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === item.value
                ? "bg-white text-orange-600 shadow-sm"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            <Icon name={item.icon} className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>

      {tab === "recent" && recent.length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={() => {
              clearRecent();
              setRecent([]);
            }}
            className="text-sm font-medium text-stone-500 hover:text-orange-600"
          >
            Clear history
          </button>
        </div>
      )}

      {needsAccount && !authLoading && !currentUser ? (
        <div className="mt-10 rounded-3xl border-2 border-dashed border-stone-200 py-16 text-center">
          <p className="text-lg font-semibold">
            {tab === "favorites"
              ? "Sign in to see your favorites"
              : "Sign in to see your songs"}
          </p>
          <p className="mt-1 text-stone-500">
            {tab === "favorites"
              ? "Favorites are saved to your account, on every device."
              : "Songs you add are linked to your account."}
          </p>
          <Link
            href={`/signin?next=${encodeURIComponent(`/library?tab=${tab}`)}`}
            className="btn-primary mt-6"
          >
            Sign in
          </Link>
        </div>
      ) : isLoading ? (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-[74px] animate-pulse rounded-2xl bg-stone-100" />
          ))}
        </div>
      ) : songs.length === 0 ? (
        <div className="mt-10 rounded-3xl border-2 border-dashed border-stone-200 py-16 text-center">
          <p className="text-lg font-semibold">Nothing here yet</p>
          <p className="mt-1 text-stone-500">{EMPTY_TEXT[tab]}</p>
          <Link
            href={tab === "mine" ? "/addsong" : "/allsongs"}
            className="btn-primary mt-6"
          >
            {tab === "mine" ? "Add a song" : "Browse songs"}
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {songs.map((song) => (
            <SongCard key={`${song.genre}/${song.language}/${song.name}`} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
