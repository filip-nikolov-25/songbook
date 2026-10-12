import { readFileSync } from "fs";
import { initializeApp } from "firebase/app";
import { get, getDatabase, goOffline, ref, set } from "firebase/database";
import { PUBLIC_DOMAIN_SONGS } from "./publicDomainSongs";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split(/\r?\n/)
    .filter((line) => line.includes("=") && !line.trim().startsWith("#"))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^["']|["']$/g, "")];
    })
);

const app = initializeApp({
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const database = getDatabase(app);

const main = async () => {
  let added = 0;
  for (const [index, song] of PUBLIC_DOMAIN_SONGS.entries()) {
    const songRef = ref(database, `songs/${song.genre}/${song.language}/${song.name}`);
    if ((await get(songRef)).exists()) {
      console.log(`skip   ${song.name} (already exists)`);
      continue;
    }
    await set(songRef, {
      text: song.text,
      artist: song.artist,
      author: "Songbook",
      createdAt: Date.now() - index * 1000,
    });
    console.log(`added  ${song.name}`);
    added++;
  }
  console.log(`\nDone: ${added} added, ${PUBLIC_DOMAIN_SONGS.length - added} skipped.`);
};

main()
  .catch((error) => {
    console.error("Seeding failed:", error.message || error);
    process.exitCode = 1;
  })
  .finally(() => goOffline(database));
