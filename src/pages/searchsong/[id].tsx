import { SelectedSongContext } from "@/context/clickedSongContext";
import { getSong } from "@/functions/userService";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const ViewOneSong = () => {
  const [fetchOneSong, setFetchOneSong] = useState();
  const { selectedSong, selectSong } = useContext(SelectedSongContext);

  const getOnlyOneSong = async () => {
    const fetchSong = await getSong(selectedSong);
    setFetchOneSong(fetchSong);
  };
  useEffect(() => {
    getOnlyOneSong();
  });
  return (
    <div className="bg-black min-h-screen  pb-20  pt-20 text-white">
      <div className="bg-gradient-to-r  from-black via-red-800 to-black pt-5 mb-10  pb-[0.001rem]">
        <div className="w-11/12 mx-auto">
          <h2 className="text-center mb-10 text-4xl font-bold text-white">
            {selectedSong}
          </h2>
        </div>
      </div>
      <div className="w-1/2  mx-auto border-l-white border-x-2 border-b-2 rounded-lg py-10">
        <div className="flex p-5 flex-wrap gap-y-5 px-4">
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
    </div>
  );
};

export default ViewOneSong;
