import { database } from "@/firebase";
import { SongDB, SongRecord, SongSummary } from "@/types/types";
import { get, ref, remove, set } from "firebase/database";

export const toSongKey = (name: string) =>
  name
    .replace(/[.#$\[\]\/]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const songPath = (genre: string, language: string, songName: string) =>
  `/songs/${encodeURIComponent(genre)}/${encodeURIComponent(
    language
  )}/${encodeURIComponent(songName)}`;

const songRef = (genre: string, language: string, key: string) =>
  ref(database, `songs/${genre}/${language}/${key}`);

export interface SongInput {
  name: string;
  artist: string;
  text: string;
  genre: string;
  language: string;
}

interface Author {
  name: string;
  uid: string;
}

type SaveResult = { key: string } | { error: string };

export const createSong = async (
  song: SongInput,
  author: Author
): Promise<SaveResult> => {
  const key = toSongKey(song.name);
  if (!key) return { error: "Please enter a valid song name." };

  try {
    const target = songRef(song.genre, song.language, key);
    if ((await get(target)).exists()) {
      return {
        error: "A song with this name already exists in this genre and language.",
      };
    }
    const record: SongRecord = {
      text: song.text,
      artist: song.artist.trim(),
      author: author.name,
      authorId: author.uid,
      createdAt: Date.now(),
    };
    await set(target, record);
    return { key };
  } catch (error) {
    console.error("Error saving the song :", error);
    return { error: "Could not save the song. Please try again." };
  }
};

export const updateSong = async (
  original: { genre: string; language: string; name: string },
  song: SongInput,
  previous: SongRecord
): Promise<SaveResult> => {
  const key = toSongKey(song.name);
  if (!key) return { error: "Please enter a valid song name." };

  const isMoved =
    original.genre !== song.genre ||
    original.language !== song.language ||
    original.name !== key;

  try {
    const target = songRef(song.genre, song.language, key);
    if (isMoved && (await get(target)).exists()) {
      return {
        error: "A song with this name already exists in this genre and language.",
      };
    }
    await set(target, {
      ...previous,
      text: song.text,
      artist: song.artist.trim(),
      updatedAt: Date.now(),
    });
    if (isMoved) {
      await remove(songRef(original.genre, original.language, original.name));
    }
    return { key };
  } catch (error) {
    console.error("Error updating the song :", error);
    return { error: "Could not save the song. Please try again." };
  }
};

export const deleteSong = async (
  genre: string,
  language: string,
  name: string
) => {
  try {
    await remove(songRef(genre, language, name));
    return true;
  } catch (error) {
    console.error("Error deleting the song :", error);
    return false;
  }
};

export const getSong = async (
  songName: string | undefined,
  genre: string | undefined,
  language: string | undefined
): Promise<SongRecord | null> => {
  try {
    if (!songName || !genre || !language) return null;

    const snapshot = await get(songRef(genre, language, songName));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error("Error fetching song data:", error);
    return null;
  }
};

export const getAllSongs = async (): Promise<SongSummary[]> => {
  try {
    const snapshot = await get(ref(database, "songs"));
    if (!snapshot.exists()) return [];

    const songsObject = snapshot.val() as SongDB;

    return Object.entries(songsObject).flatMap(([genre, languages]) =>
      Object.entries(languages).flatMap(([language, songs]) =>
        Object.entries(songs).map(([name, song]) => ({
          name,
          genre,
          language,
          artist: song.artist || "",
          author: song.author,
          authorId: song.authorId,
          createdAt: song.createdAt,
        }))
      )
    );
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

export const saveUser = async (user: string | null) => {
  try {
    await set(ref(database, "users/user/"), user);
  } catch (error) {
    console.error("Error saving user:", error);
  }
};
