import React, { useContext, useEffect, useState } from "react";
import { SelectedSongContext } from "@/context/clickedSongContext";
import { getSong } from "@/functions/userService";
import { parseToChordAndText } from "@/functions/functions";
import { useRouter } from "next/router";

const ViewOneSong = () => {
  const [songString, setSongString] = useState("");
  const { selectedSong } = useContext(SelectedSongContext);
  useEffect(() => {
    const fetch = async () => {
      if (
        !selectedSong.genre ||
        !selectedSong.language ||
        !selectedSong.selectedSong
      )
        return;

      const data = await getSong(
        selectedSong.selectedSong,
        selectedSong.genre,
        selectedSong.language
      );
      setSongString(data?.text || "");
    };

    fetch();
  }, [selectedSong]);

  const fullSong = parseToChordAndText(songString);

  return (
    <div className="bg-black min-h-screen pb-20 pt-20 text-white">
      <div className="bg-gradient-to-r from-black via-red-800 to-black pt-5 mb-10 pb-[0.001rem]">
        <div className="w-11/12 mx-auto">
          <h2 className="text-center mb-10 text-4xl font-bold text-white">
            {selectedSong.selectedSong}
          </h2>
        </div>
      </div>

      <div className="w-1/2 mx-auto border-l-white border-x-2 border-b-2 rounded-lg py-10 px-6">
        <div className="flex flex-wrap gap-y-5 px-4">
          {fullSong.map(({ chord, text }, i) => (
            <div
              key={i}
              className="flex flex-col items-start min-w-[64px] text-left"
            >
              <span className="text-yellow-300 text-sm mb-1">{chord}</span>
              <span className="text-white mr-3 text-lg whitespace-nowrap">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewOneSong;
