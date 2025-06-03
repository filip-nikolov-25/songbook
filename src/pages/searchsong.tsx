import { arrOfSongs } from "@/components/allsongs";
import React, { useEffect, useState } from "react";

const Searchsong = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchTerm);
      setShowMore(10)
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredSongs = arrOfSongs.filter((song) =>
    song.toLowerCase().includes(debounced.toLowerCase())
  );
  const [showMore, setShowMore] = useState(10);

  console.log(filteredSongs.length, showMore, "AJ DA VIDEME");

  return (
    <div className="bg-black">
      <div className="flex w-[98%] m-auto">
        <div className="w-1/6 border-r-2 bg-gradient-to-r from-black to-red-900  border-red-300 p-5 border-l-2  rounded-l-3xl rounded-r-[80%]">
          {arrOfSongs.map((song) => (
            <div
              key={song}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              {song}
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
            filteredSongs.length > 0 ? (
              filteredSongs.slice(0, showMore).map((song) => (
                <p
                  key={song}
                  className="mt-5 w-1/2 m-auto py-2 shadow-xl border-2 shadow-red-100 text-center bg-white rounded-b-full"
                >
                  {song}
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
          {debounced.length > 0 && showMore < filteredSongs.length  && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowMore((prevState) => prevState + 5)}
                className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-red-300 px-10 py-2 rounded-md border-2 bg-transparent"
              >
                Show more{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchsong;
