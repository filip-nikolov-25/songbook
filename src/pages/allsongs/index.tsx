import FilterCard from "@/components/base/FilterCard";
import React from "react";

const AllSongs = () => {
  const arrOfSongs = ["Macedonian", "Serbian", "English", "Spanish"];
  return (
    <div className="bg-black min-h-screen">
      <div className="grid grid-cols-4 gap-4 w-10/12 m-auto pt-20">
        <FilterCard text="Romantic Ballads" arrOfSongs={arrOfSongs} />
        <FilterCard text="Classic Rock" arrOfSongs={arrOfSongs} />
        <FilterCard text="Folk" arrOfSongs={arrOfSongs} />
        <FilterCard text="Pop Ballads" arrOfSongs={arrOfSongs} />

      </div>
    </div>
  );
};

export default AllSongs;
