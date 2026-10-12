import Icon from "@/components/base/Icon";
import { GENRES, LANGUAGES, labelOf } from "@/constants/songOptions";
import { songPath } from "@/functions/userService";
import { SongSummary } from "@/types/types";
import Link from "next/link";
import React from "react";

const GRADIENTS = [
  "from-orange-400 to-amber-300",
  "from-orange-500 to-rose-400",
  "from-amber-400 to-yellow-300",
  "from-orange-600 to-orange-400",
  "from-rose-400 to-orange-300",
];

const gradientFor = (name: string) =>
  GRADIENTS[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % GRADIENTS.length];

const SongCard = ({ song }: { song: SongSummary }) => (
  <Link
    href={songPath(song.genre, song.language, song.name)}
    className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-3 pr-4 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/10"
  >
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white ${gradientFor(
        song.name
      )}`}
    >
      {song.name[0]?.toUpperCase()}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate font-semibold text-stone-900 group-hover:text-orange-600">
        {song.name}
      </span>
      <span className="block truncate text-sm text-stone-500">
        {song.artist || "Unknown artist"}
      </span>
    </span>
    <span className="hidden sm:flex flex-col items-end gap-1 text-xs text-stone-400">
      <span>{labelOf(GENRES, song.genre)}</span>
      <span>{labelOf(LANGUAGES, song.language)}</span>
    </span>
    <Icon
      name="arrowRight"
      className="h-4 w-4 shrink-0 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-orange-500"
    />
  </Link>
);

export default SongCard;
