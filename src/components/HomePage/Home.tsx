import ChordDiagram from "@/components/ChordDiagram";
import Icon, { IconName } from "@/components/base/Icon";
import SongCard from "@/components/SongCard";
import { GENRES } from "@/constants/songOptions";
import { getAllSongs } from "@/functions/userService";
import { SongSummary } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "transpose",
    title: "Transpose instantly",
    text: "Move any song up or down to fit your voice. Chords and diagrams follow.",
  },
  {
    icon: "grid",
    title: "Chord diagrams",
    text: "Every chord in a song shown as a fingering chart. No more guessing.",
  },
  {
    icon: "scroll",
    title: "Autoscroll",
    text: "Keep both hands on the guitar while the song scrolls at your pace.",
  },
  {
    icon: "upload",
    title: "Paste from anywhere",
    text: "Paste chords written above lyrics and they line up automatically.",
  },
  {
    icon: "heart",
    title: "Your library",
    text: "Save favorites and find recently played songs in one place.",
  },
  {
    icon: "print",
    title: "Print friendly",
    text: "Clean, ink-saving printouts for your rehearsal folder.",
  },
];

const GENRE_STYLES: Record<string, string> = {
  romanticballads: "from-rose-400 to-orange-400",
  classicrock: "from-orange-600 to-amber-500",
  folk: "from-amber-500 to-yellow-400",
  popballads: "from-orange-400 to-pink-400",
};

const Home = () => {
  const router = useRouter();
  const [songs, setSongs] = useState<SongSummary[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllSongs().then(setSongs);
  }, []);

  const recent = [...(songs || [])]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 6);
  const artistCount = new Set(
    (songs || []).map((song) => song.artist).filter(Boolean)
  ).size;

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/allsongs${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };

  return (
    <div className="overflow-hidden">
      <section className="relative">
        <div className="absolute -top-40 -right-40 h-128 w-lg rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute top-60 -left-40 h-80 w-80 rounded-full bg-amber-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
              <Icon name="sparkles" className="h-4 w-4" />
              Chords & lyrics for guitar players
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Play the songs <br />
              <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                you love.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-stone-600">
              A community songbook with clean chord sheets, instant
              transposition and chord diagrams, made for practicing alone or
              jamming with friends.
            </p>

            <form
              onSubmit={handleSearch}
              className="mt-8 flex max-w-lg items-center gap-2 rounded-full border border-stone-200 bg-white p-1.5 pl-5 shadow-lg shadow-stone-200/50 focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100"
            >
              <Icon name="search" className="h-5 w-5 text-stone-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search songs or artists"
                className="min-w-0 flex-1 bg-transparent py-2 focus:outline-hidden"
              />
              <button type="submit" className="btn-primary">
                Search
              </button>
            </form>

            <div className="mt-10 flex gap-10">
              <div>
                <p className="text-3xl font-bold">{songs ? songs.length : "–"}</p>
                <p className="text-sm text-stone-500">Songs</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{songs ? artistCount : "–"}</p>
                <p className="text-sm text-stone-500">Artists</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{GENRES.length}</p>
                <p className="text-sm text-stone-500">Genres</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-4/5 overflow-hidden rounded-4xl shadow-2xl shadow-orange-900/20">
              <Image
                src="/Images/HandPlayingChord.jpg"
                alt="Hand playing a chord on a guitar"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-4 bottom-10 rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-xl backdrop-blur-sm sm:-left-10 animate-fade-up [animation-delay:200ms]">
              <div className="flex items-center gap-4">
                <ChordDiagram chord="Am" />
                <div className="font-mono text-sm leading-snug">
                  <p className="font-bold text-orange-600">Am &nbsp;&nbsp;&nbsp;&nbsp; G</p>
                  <p className="text-stone-700">Chords right</p>
                  <p className="font-bold text-orange-600">F &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; E</p>
                  <p className="text-stone-700">where you need them</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Browse by genre</h2>
            <p className="mt-1 text-stone-500">Find something to play tonight.</p>
          </div>
          <Link href="/allsongs" className="hidden sm:inline-flex items-center gap-1 font-semibold text-orange-600 hover:gap-2 transition-all">
            All songs <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GENRES.map((genre) => {
            const count = (songs || []).filter((song) => song.genre === genre.value).length;
            return (
              <Link
                key={genre.value}
                href={`/allsongs?genre=${genre.value}`}
                className={`group relative overflow-hidden rounded-3xl bg-linear-to-br p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl ${GENRE_STYLES[genre.value]}`}
              >
                <Icon name="music" className="absolute -right-4 -bottom-4 h-28 w-28 opacity-20 transition group-hover:rotate-12" />
                <p className="text-sm font-medium text-white/80">
                  {songs ? `${count} ${count === 1 ? "song" : "songs"}` : " "}
                </p>
                <p className="mt-8 text-xl font-bold sm:text-2xl">{genre.label}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-3xl font-bold">Recently added</h2>
        <p className="mt-1 text-stone-500">Fresh from the community.</p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {songs === null
            ? Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-[74px] animate-pulse rounded-2xl bg-stone-100" />
              ))
            : recent.map((song) => (
                <SongCard key={`${song.genre}/${song.language}/${song.name}`} song={song} />
              ))}
          {songs !== null && recent.length === 0 && (
            <p className="text-stone-500">
              No songs yet. <Link href="/addsong" className="font-semibold text-orange-600">Add the first one!</Link>
            </p>
          )}
        </div>
      </section>

      <section className="bg-stone-50 py-20 mt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            Everything you need to play
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-stone-500">
            Built for guitar players, from the first chord to the last chorus.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="card p-6 transition hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
                <p className="mt-1 text-stone-500">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-orange-500 to-amber-500 p-10 text-white shadow-2xl shadow-orange-500/30 sm:p-14">
          <Icon name="music" className="absolute -right-10 -top-10 h-64 w-64 opacity-10" />
          <h2 className="max-w-lg text-3xl font-bold sm:text-4xl">
            Know a song that&apos;s missing?
          </h2>
          <p className="mt-3 max-w-lg text-white/90">
            Add it in a couple of minutes. Type the lyrics, click the chords,
            and share it with every guitarist here.
          </p>
          <Link
            href="/addsong"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-orange-600 shadow-lg transition hover:bg-orange-50"
          >
            <Icon name="plus" className="h-4 w-4" />
            Add a song
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
