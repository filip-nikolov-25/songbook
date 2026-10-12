import { database } from "@/firebase";
import { SongSummary } from "@/types/types";
import { get, ref, remove, set, update } from "firebase/database";

const favoritesRef = (uid: string) => ref(database, `users/${uid}/favorites`);

const favoriteId = (song: SongSummary) =>
  `${song.genre}__${song.language}__${song.name}`;

const favoriteRef = (uid: string, song: SongSummary) =>
  ref(database, `users/${uid}/favorites/${favoriteId(song)}`);

type FavoriteRecord = SongSummary & { addedAt: number };

export const getFavorites = async (uid: string): Promise<SongSummary[]> => {
  try {
    const snapshot = await get(favoritesRef(uid));
    if (!snapshot.exists()) return [];
    const favorites = Object.values(snapshot.val() as Record<string, FavoriteRecord>);
    return favorites
      .sort((a, b) => b.addedAt - a.addedAt)
      .map(({ name, artist, genre, language }) => ({ name, artist, genre, language }));
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

export const isFavorite = async (uid: string, song: SongSummary) => {
  try {
    return (await get(favoriteRef(uid, song))).exists();
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
};

export const setFavorite = async (
  uid: string,
  song: SongSummary,
  favorite: boolean
): Promise<boolean | null> => {
  try {
    if (favorite) {
      const record: FavoriteRecord = {
        name: song.name,
        artist: song.artist,
        genre: song.genre,
        language: song.language,
        addedAt: Date.now(),
      };
      await set(favoriteRef(uid, song), record);
    } else {
      await remove(favoriteRef(uid, song));
    }
    return favorite;
  } catch (error) {
    console.error("Error saving favorite:", error);
    return null;
  }
};

const LEGACY_KEY = "songbook:favorites";

export const migrateLocalFavorites = async (uid: string) => {
  let legacy: SongSummary[] = [];
  try {
    legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || "[]");
  } catch {
    return;
  }
  if (legacy.length === 0) return;

  const now = Date.now();
  const updates: Record<string, FavoriteRecord> = {};
  legacy.forEach((song, index) => {
    updates[favoriteId(song)] = {
      name: song.name,
      artist: song.artist || "",
      genre: song.genre,
      language: song.language,
      addedAt: now - index,
    };
  });

  try {
    await update(favoritesRef(uid), updates);
    localStorage.removeItem(LEGACY_KEY);
  } catch (error) {
    console.error("Error moving favorites to the account:", error);
  }
};
