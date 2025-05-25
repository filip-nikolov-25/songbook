import React from "react";

interface Props {
  setChooseKey: (key: string) => void;
}

const ChooseKeyPopUp = ({ setChooseKey }: Props) => {
  const keys = [
    { chord: "Em / G", scale: "gMajorORdeMinor" },
    { chord: "Fm / G#", scale: "gSharpMajorORdFMinor" },
    { chord: "F#m / A", scale: "aMajorORfSharpMinor" },
    { chord: "Gm / B", scale: "bMajorORgMinor" },
    { chord: "G#m / H", scale: "hMajorORgSharpMinor" },
    { chord: "Am / C", scale: "cMajorORaMinor" },
    { chord: "Dm / F", scale: "fMajorORdMinor" },
    { chord: "Bm / C#", scale: "cSharpMajorORbMinor" },
    { chord: "Hm / D", scale: "dMajorORhMinor" },
    { chord: "Cm / D#", scale: "dSharpMajorORcMinor" },
    { chord: "C#m / E", scale: "eMajorORcSharpMinor" },
    { chord: "D#m / F#", scale: "fSharpMajorORdSharpMinor" },
  ];

  return (
    <div className="p-20 bg-green-600 w-4/5 mx-auto rounded-3xl">
      <div className="grid grid-cols-6 gap-4">
        {keys.map((key, index) => (
          <button
            key={index}
            onClick={() => {
              setChooseKey(key.scale)
            }}
            className="bg-white px-5 py-5 rounded-full w-full"
          >
            {key.chord}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChooseKeyPopUp;
