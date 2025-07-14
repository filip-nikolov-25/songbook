import FilterCard from "@/components/base/FilterCard";
import React from "react";

const AllSongs = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="grid grid-cols-4 gap-4 w-10/12 m-auto pt-20">
        <FilterCard text="Romantic Ballads" genre="romanticballads" />
        <FilterCard text="Classic Rock" genre="classicrock" />
        <FilterCard text="Folk" genre="folk" />
        <FilterCard text="Pop Ballads" genre="popballads" />
      </div>
    </div>
  );
};

export default AllSongs;
