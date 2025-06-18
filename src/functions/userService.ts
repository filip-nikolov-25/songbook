import { database } from "@/firebase";
import { AllChords, SongType } from "@/types/types";
import { get, ref, set } from "firebase/database";
import { use } from "react";

export const createSong = async (
  songName: string,
  songData: { text: string; chord: string }[]
) => {
  try {
    await set(ref(database, "songs/" + songName), songData);
  } catch (error) {
    console.error("Error saving song data:", error);
  }
};

export const getSong = async (songName: string) => {
  try {
    const snapshot = await get(ref(database, "songs/" + songName));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching song data:", error);
  }
};

export const setChords = async (allChords: AllChords) => {
  try {
    await set(ref(database, "allChords"), allChords);
  } catch (error) {
    console.error("Error happened:", error);
  }
};

export const getAllSongs = async (): Promise<string[]> => {
  try {
    const snapshot = await get(ref(database, "songs"));
    if (snapshot.exists()) {
      const songsObject = snapshot.val();
      return Object.keys(songsObject);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching song data:", error);
    return [];
  }
};

export const saveUser = async (user) => { 
  try {
        await set(ref(database, "users/user/"),user );
  } catch (error) {
    
  }
}
