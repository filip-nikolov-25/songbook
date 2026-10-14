import { SongSummary } from "@/types/types";
import { useSyncExternalStore } from "react";

const RECENT = "songbook:recent";
const MAX_RECENT = 12;
const NONE: SongSummary[] = [];

let cached: { raw: string | null; songs: SongSummary[] } = { raw: null, songs: NONE };
const listeners = new Set<() => void>();

const readRaw = () => {
  try {
    return localStorage.getItem(RECENT);
  } catch {
    return null;
  }
};

const write = (songs: SongSummary[]) => {
  try {
    localStorage.setItem(RECENT, JSON.stringify(songs));
  } catch {}
  listeners.forEach((listener) => listener());
};

const isSame = (a: SongSummary, b: SongSummary) =>
  a.genre === b.genre && a.language === b.language && a.name === b.name;

export const getRecent = (): SongSummary[] => {
  const raw = readRaw();
  if (raw !== cached.raw) {
    let songs = NONE;
    try {
      songs = raw ? JSON.parse(raw) : NONE;
    } catch {}
    cached = { raw, songs };
  }
  return cached.songs;
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

export const useRecent = () =>
  useSyncExternalStore(subscribe, getRecent, () => NONE);

export const addRecent = (song: SongSummary) => {
  const recent = getRecent().filter((item) => !isSame(item, song));
  write([song, ...recent].slice(0, MAX_RECENT));
};

export const clearRecent = () => write([]);
