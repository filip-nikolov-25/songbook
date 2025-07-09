import React from "react";

interface Props {
  text: string;
}

const ViewSongsComponent = ({ text }: Props) => {
  return (
    <p className=" font-bold hover:scale[1.03] hover:-translate-y-1  shadow-white text-white py-3 px-6 mt-5 rounded-xl bg-gradient-to-r from-red-500 via-red-700 to-red-900 shadow-lg hover:shadow-lg transition duration-300 ease-in-out overflow-hidden whitespace-nowrap text-ellipsis">
      {text}
    </p>
  );
};

export default ViewSongsComponent;
