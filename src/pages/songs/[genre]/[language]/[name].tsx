import ChordDiagram from "@/components/ChordDiagram";
import Icon from "@/components/base/Icon";
import Loading from "@/components/base/Loading";
import SongSheet from "@/components/SongSheet";
import { GENRES, LANGUAGES, labelOf } from "@/constants/songOptions";
import { DefaultUserContext } from "@/context/loggedInUserContext";
import { firstChord, parseSong, uniqueChords } from "@/functions/chords";
import {
  isFavorite,
  setFavorite as setFavoriteInAccount,
} from "@/functions/favorites";
import { addRecent } from "@/functions/library";
import { deleteSong, getSong } from "@/functions/userService";
import { SongRecord, SongSummary } from "@/types/types";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";

const ViewOneSong = () => {
  const router = useRouter();
  const { currentUser } = useContext(DefaultUserContext);
  const { genre, language, name } = router.query as Record<string, string>;
  const [song, setSong] = useState<SongRecord | null | undefined>(undefined);
  const [transpose, setTranspose] = useState(0);
  const [fontSize, setFontSize] = useState(17);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [showChords, setShowChords] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [toast, setToast] = useState("");

  const summary: SongSummary | null = useMemo(
    () =>
      song && name
        ? { name, genre, language, artist: song.artist || "" }
        : null,
    [song, name, genre, language]
  );

  useEffect(() => {
    if (!router.isReady) return;
    setSong(undefined);
    setTranspose(0);
    getSong(name, genre, language).then(setSong);
  }, [router.isReady, name, genre, language]);

  useEffect(() => {
    if (summary) addRecent(summary);
  }, [summary]);

  useEffect(() => {
    setFavorite(false);
    if (!summary || !currentUser) return;
    let isCurrent = true;
    isFavorite(currentUser.uid, summary).then(
      (value) => isCurrent && setFavorite(value)
    );
    return () => {
      isCurrent = false;
    };
  }, [summary, currentUser]);

  useEffect(() => {
    if (!isScrolling) return;
    const interval = setInterval(() => {
      window.scrollBy(0, 1);
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) setIsScrolling(false);
    }, 110 - scrollSpeed * 20);
    return () => clearInterval(interval);
  }, [isScrolling, scrollSpeed]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === " ") {
        event.preventDefault();
        setIsScrolling((value) => !value);
      }
      if (event.key === "+" || event.key === "=") setTranspose((t) => t + 1);
      if (event.key === "-") setTranspose((t) => t - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timeout);
  }, [toast]);

  const lines = useMemo(
    () => parseSong(song?.text || "", transpose),
    [song, transpose]
  );
  const chords = useMemo(() => uniqueChords(lines), [lines]);
  const songKey = firstChord(lines);
  const isOwner = Boolean(
    currentUser && song?.authorId && song.authorId === currentUser.uid
  );

  const handleFavorite = async () => {
    if (!summary) return;
    if (!currentUser) {
      router.push(`/signin?next=${encodeURIComponent(router.asPath)}`);
      return;
    }
    const wanted = !favorite;
    setFavorite(wanted);
    const saved = await setFavoriteInAccount(currentUser.uid, summary, wanted);
    if (saved === null) {
      setFavorite(!wanted);
      setToast("Could not update favorites");
      return;
    }
    setToast(saved ? "Added to favorites" : "Removed from favorites");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast("Link copied");
    } catch {
      setToast("Could not copy the link");
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    if (await deleteSong(genre, language, name)) {
      router.push("/allsongs");
    } else {
      setToast("Could not delete the song");
    }
  };

  if (song === undefined) return <Loading />;

  if (song === null) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
          <Icon name="music" className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl font-bold">Song not found</h1>
        <p className="mt-2 text-stone-500">
          It may have been renamed or removed.
        </p>
        <Link href="/allsongs" className="btn-primary mt-8">
          Browse songs
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <Head>
        <title>{`${name}${song.artist ? ` – ${song.artist}` : ""} · Songbook`}</title>
      </Head>

      <section className="border-b border-stone-200 bg-gradient-to-b from-orange-50 to-white print:border-0 print:bg-none">
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-8 sm:px-6">
          <Link
            href={`/allsongs?genre=${genre}&language=${language}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-orange-600 print:hidden"
          >
            <Icon name="arrowLeft" className="h-4 w-4" />
            {labelOf(GENRES, genre)} · {labelOf(LANGUAGES, language)}
          </Link>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {name}
              </h1>
              <p className="mt-2 text-xl text-stone-600">
                {song.artist || "Unknown artist"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm print:hidden">
                {songKey && (
                  <span className="rounded-full bg-orange-500 px-3 py-1 font-semibold text-white">
                    Key {songKey}
                  </span>
                )}
                <span className="rounded-full bg-white px-3 py-1 text-stone-600 ring-1 ring-stone-200">
                  {chords.length} chords
                </span>
                {song.author && (
                  <span className="rounded-full bg-white px-3 py-1 text-stone-600 ring-1 ring-stone-200">
                    Added by {song.author}
                    {song.createdAt &&
                      ` · ${new Date(song.createdAt).toLocaleDateString()}`}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 print:hidden">
              <button
                onClick={handleFavorite}
                className={`icon-btn !h-11 !w-11 ${
                  favorite ? "!border-orange-300 !text-orange-500" : ""
                }`}
                title={
                  !currentUser
                    ? "Sign in to save favorites"
                    : favorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <Icon name="heart" filled={favorite} className="h-5 w-5" />
              </button>
              <button onClick={handleShare} className="icon-btn !h-11 !w-11" title="Copy link">
                <Icon name="link" className="h-5 w-5" />
              </button>
              {isOwner && (
                <>
                  <Link
                    href={`/addsong?edit=1&genre=${genre}&language=${language}&name=${encodeURIComponent(name)}`}
                    className="icon-btn !h-11 !w-11"
                    title="Edit song"
                  >
                    <Icon name="edit" className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="icon-btn !h-11 !w-11 hover:!border-red-300 hover:!text-red-500"
                    title="Delete song"
                  >
                    <Icon name="trash" className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-lg print:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-x-4 gap-y-2 overflow-x-auto px-4 py-2.5 sm:flex-wrap sm:gap-x-6 sm:px-6">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="mr-1 hidden text-xs font-semibold uppercase tracking-wider text-stone-400 sm:inline">
              Key
            </span>
            <button className="icon-btn" onClick={() => setTranspose((t) => t - 1)} aria-label="Transpose down">
              <Icon name="minus" className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-mono font-semibold">
              {transpose > 0 ? `+${transpose}` : transpose}
            </span>
            <button className="icon-btn" onClick={() => setTranspose((t) => t + 1)} aria-label="Transpose up">
              <Icon name="plus" className="h-4 w-4" />
            </button>
            <button
              className="icon-btn"
              onClick={() => setTranspose(0)}
              disabled={transpose === 0}
              aria-label="Reset transpose"
            >
              <Icon name="reset" className="h-4 w-4" />
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <span className="mr-1 hidden text-xs font-semibold uppercase tracking-wider text-stone-400 sm:inline">
              Text
            </span>
            <button
              className="icon-btn text-xs font-bold"
              onClick={() => setFontSize((size) => Math.max(12, size - 2))}
              aria-label="Smaller text"
            >
              A-
            </button>
            <button
              className="icon-btn text-sm font-bold"
              onClick={() => setFontSize((size) => Math.min(32, size + 2))}
              aria-label="Bigger text"
            >
              A+
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <span className="mr-1 hidden text-xs font-semibold uppercase tracking-wider text-stone-400 sm:inline">
              Scroll
            </span>
            <button
              className={`icon-btn ${isScrolling ? "!border-orange-500 !bg-orange-500 !text-white" : ""}`}
              onClick={() => setIsScrolling(!isScrolling)}
              aria-label={isScrolling ? "Stop scrolling" : "Start scrolling"}
              title="Space"
            >
              <Icon name={isScrolling ? "pause" : "play"} filled className="h-4 w-4" />
            </button>
            <input
              type="range"
              min={1}
              max={5}
              value={scrollSpeed}
              onChange={(e) => setScrollSpeed(Number(e.target.value))}
              className="w-16 accent-orange-500 sm:w-20"
              aria-label="Scroll speed"
            />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <button
              className={`chip ${showChords ? "chip-on" : "chip-off"}`}
              onClick={() => setShowChords(!showChords)}
            >
              <Icon name="grid" className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Diagrams</span>
            </button>
            <button className="icon-btn" onClick={() => window.print()} aria-label="Print">
              <Icon name="print" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[1fr_auto]">
        {showChords && chords.length > 0 && (
          <aside className="lg:order-2 print:hidden">
            <div className="lg:sticky lg:top-36">
              <h2 className="label">Chords in this song</h2>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
                {chords.map((chord) => (
                  <ChordDiagram key={chord} chord={chord} />
                ))}
              </div>
            </div>
          </aside>
        )}
        <article className="min-w-0">
          <SongSheet lines={lines} fontSize={fontSize} />
        </article>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white shadow-xl animate-fade-up">
          <Icon name="check" className="mr-2 inline h-4 w-4 text-orange-400" />
          {toast}
        </div>
      )}
    </div>
  );
};

export default ViewOneSong;
