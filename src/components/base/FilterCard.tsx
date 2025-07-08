import React from "react";

interface Props {
  text: string;
  arrOfSongs: string[];
}

const FilterCard = ({ text, arrOfSongs }: Props) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-300/50 to-gray-900/80  rounded-b-[30%] cursor-pointer border-white border-2 p-8 text-center transition duration-700 ease-in-out origin-bottom hover:scale-109 shadow-xl hover:shadow-none mb-10 shadow-white">
      
      <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300 mb-6   ">
        {text}
      </h3>

      <div className="space-y-3">
        {arrOfSongs.map((songName, index) => (
          <p
            key={index}
            className="text-xl font-semibold text-gray-200 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 tracking-wide relative group"
          >
            <span className=" relative">
              {songName}
              <span className="absolute top-3 -left-10 w-3 h-3 bg-red-500  opacity-0 group-hover:opacity-80 animate-spin"></span>
              <span className="absolute top-3 -right-10 w-3 h-3 bg-red-500 opacity-0 group-hover:opacity-80 animate-spin"></span>
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;