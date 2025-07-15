import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-black">
      <div className="flex  items-center">
        <div className="w-5 h-5 border-4 border-double rounded-full animate-bounce [animation-delay:0.3s] mr-2  border-red-500"></div>
        <div className="w-5 h-5 border-4 border-double rounded-full animate-bounce [animation-delay:0.6s] mr-2   border-red-500"></div>
        <div className="w-5 h-5 border-4 border-double rounded-full animate-bounce border-red-500  [animation-delay:-2.9s] "></div>
      </div>
      <p className=" mt-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-100 to-red-800 animate-pulse  ">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
