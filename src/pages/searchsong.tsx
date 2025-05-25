import React, { useState } from "react";

const Searchsong = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  console.log(searchTerm,"SEARCH")
  return (
    <div className="bg-black">
      <div className="text-center p-10">
        <input
          type="text"
          placeholder="Search a song"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Searchsong;
