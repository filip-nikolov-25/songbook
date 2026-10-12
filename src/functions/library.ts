import { SongSummary } from "@/types/types";

const RECENT = "songbook:recent";
const MAX_RECENT = 12;

const read = (key: string): SongSummary[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const write = (key: string, songs: SongSummary[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(songs));
  } catch {}
};

const isSame = (a: SongSummary, b: SongSummary) =>
  a.genre === b.genre && a.language === b.language && a.name === b.name;

export const getRecent = () => read(RECENT);

export const addRecent = (song: SongSummary) => {
  const recent = getRecent().filter((item) => !isSame(item, song));
  write(RECENT, [song, ...recent].slice(0, MAX_RECENT));
};

export const clearRecent = () => write(RECENT, []);
