import CustomSelect from "@/components/SongsPage/CustomSelect";
import ViewSongsComponent from "@/components/SongsPage/ViewSongsComponent";
import { getAllSongs } from "@/functions/userService";
import React, { useEffect, useState } from "react";

const ViewSongs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [allSongs, setAllSongs] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(10);
  const [selected, setSelected] = useState("Sort by");

  const options = ["A-Z", "Z-A"];
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchTerm);
      setShowMore(10);
    }, 700);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const fetchSongs = async () => {
      const songs = await getAllSongs();
      setAllSongs(songs);
    };
    fetchSongs();
  }, []);

  const filteredSongs = allSongs
    .filter((song) => song.toLowerCase().includes(debounced.toLowerCase()))
    .sort((a, b) => {
      if (selected === "A-Z") {
        return a.localeCompare(b);
      }
      if (selected === "Z-A") {
        return b.localeCompare(a);
      }
      return 0;
    });

  return (
    <div className="bg-black min-h-screen">
      <div className="flex w-full m-auto">
        <div className="w-4/6 mx-auto">
          <div className="shadow-white shadow-lg bg-gradient-to-r from-black to-red-900 p-10 border-b-2 border-red-300">
            <div className="flex justify-between">
              <input
                type="text"
                className="border-2 focus:shadow-white focus:shadow-lg focus:outline-none shadow-2xl backdrop-blur-3xl backdrop-brightness-200 border-black py-2 px-5 rounded-3xl"
                placeholder="Search a song"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CustomSelect
                setSelected={setSelected}
                selected={selected}
                options={options}
              />
            </div>

            <div className="min-h-screen">
              {debounced.length > 0 && filteredSongs.length === 0 ? (
                <div className="text-white text-center mt-10 text-2xl">
                  No songs found
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-5 text-center mt-10">
                  {filteredSongs.slice(0, showMore).map((song) => (
                    <ViewSongsComponent key={song} text={song} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {debounced.length === 0 ||
          (filteredSongs && showMore < filteredSongs.length) ? (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowMore((prev) => prev + 5)}
                className="text-gray-300 hover:text-white hover:shadow-lg hover:shadow-red-300 px-10 py-2 rounded-md border-2 bg-transparent"
              >
                Show more
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ViewSongs;
