import { database } from "@/firebase";
import {  SongDB } from "@/types/types";
import { get, ref, set } from "firebase/database";

export const createSong = async (
  songName: string,
  songData: { text: string; chord: string }[],
  genre: string,
  language: string
) => {
  try {
    const formattedText = songData
      .map(({ chord, text }) => {
        return chord ? `[${chord}]${text}` : text;
      })
      .join("\n");

    await set(ref(database, `songs/${genre}/${language}/` + songName), {
      text: formattedText,
    });
  } catch (error) {
    console.error("Error saving the song :", error);
  }
};

export const getSong = async (
  songName: string | undefined,
  genre: string | undefined,
  language: string | undefined
) => {
  try {
    if (!songName || !genre || !language) return null;

    const snapshot = await get(
      ref(database, `songs/${genre}/${language}/${songName}`)
    );
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching song data:", error);
  }
};

export const getAllSongs = async (): Promise<string[]> => {
  try {
    const snapshot = await get(ref(database, "songs"));
    if (!snapshot.exists()) return [];

    const songsObject = snapshot.val() as SongDB;

    const allTitles = Object.entries(songsObject).flatMap(([_, languages]) =>
      Object.entries(languages).flatMap(([__, songs]) => Object.keys(songs))
    );

    return [...new Set(allTitles)];
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};
export const getAllSongsByGenre = async (
  genre: string | undefined,
  language: string | undefined
): Promise<string[]> => {
  try {
    if (!genre || !language) return [];

    const snapshot = await get(ref(database, `songs/${genre}/${language}`));
    if (!snapshot.exists()) return [];

    const songsObject = snapshot.val(); 

    return Object.keys(songsObject);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};


export const saveUser = async (user: any) => {
  try {
    await set(ref(database, "users/user/"), user);
  } catch (error) {}
};
