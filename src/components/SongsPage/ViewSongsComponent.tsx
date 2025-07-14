import Link from "next/link";
import React from "react";
interface Props {
  text: string;
  onClick?: (songName: string) => void;
}

const ViewSongsComponent = ({ text, onClick }: Props) => {
  return (
    <Link href={`/songs/${text.replace(/\s+/g, "").toLowerCase()}`}>
      <p
        onClick={() => onClick?.(text)}
        className=" font-bold hover:scale-105 hover:-translate-y-1  shadow-white text-white py-3 px-6 mt-5 rounded-xl bg-gradient-to-r from-red-500 via-red-700 to-red-900 shadow-lg hover:shadow-lg transition duration-300 ease-in-out overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {text}
      </p>
    </Link>
  );
};

export default ViewSongsComponent;
