import SelectedSongProvider, {
  SelectedSongContext,
} from "@/context/clickedSongContext";
import { getAllSongs, getSong } from "@/functions/userService";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Searchsong = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [allSongs, setAllSongs] = useState<string[]>();
  const { selectSong } = useContext(SelectedSongContext);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchTerm);
      setShowMore(10);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredSongs = allSongs?.filter((song) =>
    song.toLowerCase().includes(debounced.toLowerCase())
  );
  const [showMore, setShowMore] = useState(10);
  const fetchSongs = async () => {
    const songs = await getAllSongs();
    setAllSongs(songs);
  };
  useEffect(() => {
    fetchSongs();
  });

  return (
    <div className="bg-black">
      <div className="flex w-[98%] m-auto">
        <div className="w-1/6 border-r-2 bg-gradient-to-r from-black to-red-900  border-red-300 p-5 border-l-2  rounded-l-3xl rounded-r-[80%]">
          {allSongs?.map((song) => (
            <div
              key={song}
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={() => {
                selectSong(song);
              }}
            >
              <Link
                href={`/searchsong/${song.replace(/\s+/g, "").toLowerCase()}`}
              >
                <span>{song}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-5/6">
          <div className="text-center shadow-white shadow-lg bg-gradient-to-r from-black to-red-900 p-10 rounded-b-full border-b-2 border-red-300">
            <input
              type="text"
              className="border-2 focus:shadow-white focus:shadow-lg focus:outline-none shadow-2xl backdrop-blur-3xl backdrop-brightness-200 border-black py-2 px-5 rounded-3xl"
              placeholder="Search a song"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {debounced.length > 0 ? (
            filteredSongs?.length > 0 ? (
              filteredSongs?.slice(0, showMore).map((song) => (
                <p
                  key={song}
                  onClick={() => {
                    selectSong(song);
                  }}
                  className="mt-5 w-1/2 m-auto py-2 shadow-xl border-2 shadow-red-100 text-center bg-white rounded-b-full"
                >
                  <Link
                    href={`/searchsong/${song
                      .replace(/\s+/g, "")
                      .toLowerCase()}`}
                  >
                    <span>{song}</span>
                  </Link>
                </p>
              ))
            ) : (
              <div className="text-white text-center mt-10 text-2xl">
                No songs found
              </div>
            )
          ) : (
            <div className="text-white text-center mt-20 text-xl">
              Search a song
            </div>
          )}
          {debounced.length > 0 && showMore < filteredSongs?.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowMore((prevState) => prevState + 5)}
                className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-red-300 px-10 py-2 rounded-md border-2 bg-transparent"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>

      {/* {clickedSong.length > 0 && (
        <div className="w-1/2 mx-auto border-l-white border-x-2 border-b-2 rounded-lg py-10">
          <div className="flex flex-wrap gap-y-5 px-4">
            {fetchOneSong && fetchOneSong.length > 0 ? (
              fetchOneSong.map((entry, index) => (
                <div
                  className="flex flex-col items-start min-w-[64px] text-left"
                  key={index}
                >
                  <span className="text-yellow-300 text-sm mb-1">
                    {entry.chord}
                  </span>
                  <span className="text-white mr-3 text-lg whitespace-nowrap">
                    {entry.text}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-red-500">FOUND SONG</p>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Searchsong;
