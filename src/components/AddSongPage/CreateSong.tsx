import { createSong } from "@/functions/userService";
import { AllChords, MusicStyleType } from "@/types/types";
import React, { useEffect, useState } from "react";

interface Props {
  allChordsData: AllChords;
  keyOfASong: string;
  text: string;
  setText: (text: string) => void;
}

const CreateSong = ({ allChordsData, keyOfASong, text, setText }: Props) => {
  const [allChords, setAllChords] = useState<string[]>([]);
  const [verseData, setVerseData] = useState<{ text: string; chord: string }[]>(
    []
  );
  const [nameOfTheSong, setNameOfTheSong] = useState<string>("");
  const [musicStyle, setMusicStyle] = useState<MusicStyleType>({
    genre: "",
    language: "",
  });

  useEffect(() => {
    if (allChordsData) {
      const chords =
        //@ts-expect-error element implicitly has an "any" type because expression of type string can't be used to index type "AllChords"
        allChordsData[keyOfASong]?.chordScale ||
        allChordsData.cMajorORaMinor.chordScale;
      setAllChords(chords);
    }
  }, [allChordsData, keyOfASong]);

  const handleAddChord = (text: string, chord: string) => {
    if (text && chord) {
      setVerseData((prevState) => [...prevState, { text, chord }]);
      setText("");
    } else if (text) {
      setVerseData((prevState) => [...prevState, { text, chord: "" }]);
      setText("");
    } else if (chord) {
      setVerseData((prevState) => [...prevState, { text: "", chord }]);
    } else {
      alert("Please enter text or chord for the verse.");
    }
  };
  const baseClass = `w-14 h-14 rounded-full flex justify-center items-center p-2 m-2 cursor-pointer backdrop-blur-md bg-black/40 shadow-lg text-white hover:text-white hover:shadow-white`;

  return (
    <div className="w-11/12  pt-20 m-auto">
      <div className="flex">
        <div className="w-1/2 mr-10 ">
          <input
            type="text"
            placeholder="Enter name of the song"
            className="bg-black text-white rounded-md mb-5 p-2 w-full"
            onChange={(e) => setNameOfTheSong(e.target.value)}
          />
          <textarea
            name="textarea"
            value={text}
            placeholder="Enter the text for the song"
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="p-2 resize-none focus:outline-none rounded-tl-full text-white pl-36 rounded-br-full w-full border-2 bg-black h-44 mt-4"
          ></textarea>
        </div>

        <div className="w-1/2 border-l-white border-x-2 border-b-2 rounded-lg py-10">
          <div className="flex flex-wrap gap-y-5 px-4">
            {verseData && verseData.length > 0 ? (
              verseData.map((entry, index) => (
                <div
                  className="flex flex-col items-start min-w-[64px] text-left"
                  key={index}
                >
                  <span className="text-yellow-300 text-sm mb-1">
                    {entry.chord}
                  </span>
                  <span className="text-white mr-3 text-lg whitespace-nowrap">
                    {entry.text}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-red-500">
                Add chord to see your latest added verse
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex mt-20">
        {allChords.map((chord, index) => {
          if (index === 0) {
            return (
              <div
                onClick={() => handleAddChord(text, chord)}
                key={chord}
                className={baseClass}
              >
                {chord}
              </div>
            );
          }
          if (index === 1) {
            return (
              <div
                onClick={() => handleAddChord(text, chord)}
                key={chord}
                className={baseClass}
              >
                {chord}
              </div>
            );
          }
          if (index === 2) {
            return (
              <div
                onClick={() => handleAddChord(text, chord)}
                key={chord}
                className={baseClass}
              >
                {chord}
              </div>
            );
          }
          if (index === 3) {
            return (
              <div
                onClick={() => handleAddChord(text, chord)}
                key={chord}
                className={baseClass}
              >
                {chord}
              </div>
            );
          }
          if (index === 4) {
            return (
              <div
                onClick={() => handleAddChord(text, chord)}
                key={chord}
                className={baseClass}
              >
                {chord}
              </div>
            );
          }
          if (index === 5) {
            return (
              <div
                onClick={() => handleAddChord(text, chord)}
                key={chord}
                className={baseClass}
              >
                {chord}
              </div>
            );
          }
          if (index === 6) {
            return (
              <div
                onClick={() => handleAddChord(text, chord)}
                key={chord}
                className={baseClass}
              >
                {chord}
              </div>
            );
          }
        })}
      </div>
      <div className="text-center mt-10 pb-20  w-1/2">
        <h2>Choose the genre of the song</h2>
        <div className="flex flex-col">
          <button
            className="bg-white mt-5"
            onClick={() => setMusicStyle({...musicStyle, genre: "romanticballads" })}
          >
            Romantic Ballads
          </button>
          <button  onClick={() => setMusicStyle({...musicStyle, genre: "classicrock" })} className="bg-white mt-5 mb-5">Classic Rock</button>
          <button  onClick={() => setMusicStyle({...musicStyle, genre: "folk" })} className="bg-white">Folk</button>
          <button  onClick={() => setMusicStyle({...musicStyle, genre: "popballads" })} className="bg-white mt-5">Pop Ballads</button>
        </div>
        <h2>Choose the language of the song</h2>
        <div className="flex flex-col">
          <button
            className="bg-white mt-5"
            onClick={() => setMusicStyle({...musicStyle, language: "en" })}
          >
            English
          </button>
          <button
            onClick={() => setMusicStyle({...musicStyle, language: "srb" })}
            className="bg-white mt-5 mb-5"
          >
            Serbian
          </button>
          <button
            onClick={() => setMusicStyle({...musicStyle, language: "mk" })}
            className="bg-white"
          >
            Macedonian
          </button>
          <button
            onClick={() => setMusicStyle({...musicStyle, language: "esp" })}
            className="bg-white mt-5"
          >
            Spanish
          </button>
        </div>
        <button
          onClick={() => {
            if (
              verseData.length > 0 &&
              nameOfTheSong &&
              musicStyle.genre &&
              musicStyle.language
            ) {
              createSong(
                nameOfTheSong,
                verseData,
                musicStyle.genre,
                musicStyle.language
              );
            }
          }}
          className="px-5 py-2  bg-black text-red-500 rounded-xl"
        >
          Submit your song
        </button>
      </div>
    </div>
  );
};

export default CreateSong;
