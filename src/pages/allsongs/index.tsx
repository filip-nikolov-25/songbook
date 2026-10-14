import Icon from "@/components/base/Icon";
import SongCard from "@/components/SongCard";
import { GENRES, LANGUAGES } from "@/constants/songOptions";
import { getAllSongs } from "@/functions/userService";
import { SongSummary } from "@/types/types";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
  { value: "artist", label: "Artist" },
];
const PAGE_SIZE = 20;

const AllSongs = () => {
  const router = useRouter();
  const [songs, setSongs] = useState<SongSummary[] | null>(null);
  const [typedSearch, setSearch] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const query = router.query as Record<string, string | undefined>;
  const genre = query.genre || "";
  const language = query.language || "";
  const sort = query.sort || "newest";
  const search = typedSearch ?? query.q ?? "";

  useEffect(() => {
    getAllSongs().then(setSongs);
  }, []);

  const updateQuery = (changes: Record<string, string>) => {
    const next = { ...query, ...changes };
    Object.keys(next).forEach((key) => !next[key] && delete next[key]);
    router.replace({ pathname: "/allsongs", query: next }, undefined, {
      shallow: true,
      scroll: false,
    });
    setVisible(PAGE_SIZE);
  };

  useEffect(() => {
    if (!router.isReady || search === (query.q || "")) return;
    const timeout = setTimeout(() => updateQuery({ q: search }), 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const results = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (songs || [])
      .filter((song) => !genre || song.genre === genre)
      .filter((song) => !language || song.language === language)
      .filter((song) =>
        `${song.name} ${song.artist}`.toLowerCase().includes(term)
      )
      .sort((a, b) => {
        if (sort === "az") return a.name.localeCompare(b.name);
        if (sort === "za") return b.name.localeCompare(a.name);
        if (sort === "artist")
          return (a.artist || "~").localeCompare(b.artist || "~");
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
  }, [songs, search, genre, language, sort]);

  const hasFilters = Boolean(search || genre || language);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Head>
        <title>Browse songs · Songbook</title>
      </Head>
      <h1 className="text-4xl font-bold tracking-tight">Browse songs</h1>
      <p className="mt-2 text-stone-500">
        Search by song name or artist, then narrow it down by genre and
        language.
      </p>

      <div className="mt-8 card p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search songs or artists"
              className="input pl-11"
              autoFocus
            />
          </label>
          <select
            value={sort}
            onChange={(e) => updateQuery({ sort: e.target.value === "newest" ? "" : e.target.value })}
            className="input sm:w-44 cursor-pointer"
            aria-label="Sort"
          >
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort: {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => updateQuery({ genre: "" })}
            className={`chip ${!genre ? "chip-on" : "chip-off"}`}
          >
            All genres
          </button>
          {GENRES.map((item) => (
            <button
              key={item.value}
              onClick={() => updateQuery({ genre: item.value })}
              className={`chip ${genre === item.value ? "chip-on" : "chip-off"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => updateQuery({ language: "" })}
            className={`chip ${!language ? "chip-on" : "chip-off"}`}
          >
            All languages
          </button>
          {LANGUAGES.map((item) => (
            <button
              key={item.value}
              onClick={() => updateQuery({ language: item.value })}
              className={`chip ${language === item.value ? "chip-on" : "chip-off"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-sm text-stone-500">
        <span>
          {songs === null
            ? "Loading songs…"
            : `${results.length} ${results.length === 1 ? "song" : "songs"}`}
        </span>
        {hasFilters && (
          <button
            onClick={() => {
              setSearch(null);
              router.replace("/allsongs", undefined, { shallow: true });
            }}
            className="font-medium text-orange-600 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {songs === null &&
          Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-[74px] animate-pulse rounded-2xl bg-stone-100" />
          ))}
        {results.slice(0, visible).map((song) => (
          <SongCard key={`${song.genre}/${song.language}/${song.name}`} song={song} />
        ))}
      </div>

      {songs !== null && results.length === 0 && (
        <div className="mt-6 rounded-3xl border-2 border-dashed border-stone-200 py-16 text-center">
          <p className="text-lg font-semibold">No songs found</p>
          <p className="mt-1 text-stone-500">
            Try a different search, or add the song yourself.
          </p>
          <Link href="/addsong" className="btn-primary mt-6">
            <Icon name="plus" className="h-4 w-4" />
            Add a song
          </Link>
        </div>
      )}

      {visible < results.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
            className="btn-secondary"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default AllSongs;
