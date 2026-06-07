import React from "react";

interface Props {
  setChooseKey: (key: string) => void;
}

const ChooseKeyPopUp = ({ setChooseKey }: Props) => {
  const keys = [
    { chord: "Am / C", scale: "cMajorORaMinor" },
    { chord: "A#m / C#", scale: "cSharpMajorORaSharpMinor" },
    { chord: "Bm / D", scale: "dMajorORbMinor" },
    { chord: "Cm / D#", scale: "dSharpMajorORcMinor" },
    { chord: "C#m / E", scale: "eMajorORcSharpMinor" },
    { chord: "Dm / F", scale: "fMajorORdMinor" },
    { chord: "D#m / F#", scale: "fSharpMajorORdSharpMinor" },
    { chord: "Em / G", scale: "gMajorORdeMinor" },
    { chord: "Fm / G#", scale: "gSharpMajorORdFMinor" },
    { chord: "F#m / A", scale: "aMajorORfSharpMinor" },
    { chord: "Gm / Bb", scale: "bMajorORgMinor" },
    { chord: "G#m / B", scale: "hMajorORgSharpMinor" },
  ];

  return (
    <div className="bg-[#181818] border border-gray-800 rounded-lg p-6 shadow-2xl w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Select Key</h3>
        <span className="text-[10px] text-gray-600 uppercase">Click to transpose</span>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {keys.map((key, index) => (
          <button
            key={index}
            onClick={() => setChooseKey(key.scale)}
            className="px-3 py-3 text-sm font-medium text-gray-300 bg-[#252525] hover:bg-blue-600 hover:text-white rounded transition-colors duration-200 border border-transparent hover:border-blue-400 text-center"
          >
            {key.chord.replace("H", "B")}
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-800 text-[11px] text-gray-500 italic">
        *Selecting a key will automatically adjust all chords in your document.
      </div>
    </div>
  );
};

export default ChooseKeyPopUp;