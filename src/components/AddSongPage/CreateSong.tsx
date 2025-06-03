import { createSong, getSong } from "@/functions/userService";
import { AllChords } from "@/types/types";
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
  const [justWrittenVerse, setJustWrittenVerse] = useState<
    { text: string; chord: string }[]
  >([]);

  const handleGetSong = async (songName: string) => {
    const song = await getSong(songName);
    if (song) {
      setJustWrittenVerse(song);
    }
  };

  useEffect(() => {
    if (allChordsData) {
      const chords =
        //@ts-expect-error element implicitly has an "any" type because expression of type string can't be used to index type "AllChords"
        allChordsData[keyOfASong]?.chordScale ||
        allChordsData.cMajorORaMinor.chordScale;
      setAllChords(chords);
    }
  }, [allChordsData, keyOfASong]);
  console.log(verseData,"V")
  useEffect(() => {
    if (verseData.length > 0 && nameOfTheSong) {
      createSong(nameOfTheSong, verseData); 
      handleGetSong(nameOfTheSong); 
    }
  }, [verseData, nameOfTheSong]);

  const handleAddChord = (text: string, chord: string) => {
    if (text) {
      setVerseData((prevState) => [...prevState, { text, chord }]);
      setText("");
    } else if (chord) {
      setVerseData((prevState) => [...prevState, { text: "", chord: chord }]);
    } else {
      alert("Please enter text or chord for the verse.");
    }
  };

  return (
    <>
      <div className="relative h-[100vh]">
        {/* <div className="w-1/2">
          <input
            type="text"
            placeholder="Enter name of the song"
            className="bg-[#ffe6f0] p-2 w-full"
            onChange={(e) => setNameOfTheSong(e.target.value)}
          />
          <textarea
            name="textarea"
            value={text}
            placeholder="Enter the text for the song"
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="p-2 w-full h-40 mt-4"
          ></textarea>
        </div> */}
        <div className="w-1/2 h-[100vh] absolute top-1/3 left-1/2  ">
        <div className="relative ">
          <div className="w-[150px] h-[150px] bg-white rounded-full flex justify-center items-center">B</div>

          {allChords.map((chord,index) => {
            
            if(index === 0 ) {
              return   <div
              onClick={() => handleAddChord(text, chord)}
              key={chord}
              className="bg-cyan-500 absolute top-[-47%] right-[88.2%] w-14 h-14 rounded-full flex justify-center items-center  p-2 m-2 cursor-pointer"
              >
              {chord}
            </div>
            }
            if(index === 1 ) {
              return   <div
              onClick={() => handleAddChord(text, chord)}
              key={chord}
              className="bg-cyan-500 absolute top-[83%] right-[80.5%] rounded-full w-14 h-14 flex justify-center items-center p-2 m-2 cursor-pointer"
              >
              {chord}
            </div>
            }
            if(index === 2 ) {
              return   <div
              onClick={() => handleAddChord(text, chord)}
              key={chord}
              className="bg-cyan-500 p-2 m-2 cursor-pointer absolute top-[83%] right-[96.2%] rounded-full w-14 h-14 flex justify-center items-center "
              >
              {chord}
            </div>
            }
            if(index === 3 ) {
              return   <div
              onClick={() => handleAddChord(text, chord)}
              key={chord}
              className="bg-cyan-500 p-2 m-2 cursor-pointer absolute top-[-30%] right-[96%] rounded-full w-14 h-14 flex justify-center items-center"
              >
              {chord}
            </div>
            }
            if(index === 4 ) {
            return   <div
              onClick={() => handleAddChord(text, chord)}
              key={chord}
              className="bg-cyan-500 p-2 m-2 cursor-pointer absolute top-[-30%] right-[80.5%] rounded-full w-14 h-14 flex justify-center items-center "
              >
              {chord}
            </div>
            }
            if(index === 5 ) {
              return   <div
              onClick={() => handleAddChord(text, chord)}
              key={chord}
              className="bg-cyan-500 p-2 m-2 cursor-pointer absolute top-[99.5%] right-[88.2%] rounded-full w-14 h-14 flex justify-center items-center "
              >
              {chord}
            </div>
            }
            if(index === 6 ) {
              return   <div
              onClick={() => handleAddChord(text, chord)}
              key={chord}
              className="bg-cyan-500 p-2 m-2 cursor-pointer absolute top-[14.7%] right-[27.5%] rounded-full w-14 h-14 flex justify-center items-center"
              >
              {chord}
            </div>
            }
          })}
          </div>
        </div>
      </div>
      {/* <div className="flex  ">
        {justWrittenVerse && justWrittenVerse.length > 0 ? (
          justWrittenVerse.map((entry, index) => (
            <div className="flex " key={index}>
              <p className="mt-5 ">{entry.text}</p>
              <p>{entry.chord}</p>
            </div>
          ))
        ) : (
          <p className="text-red-500">
            Add chord to see your latest added verse
          </p>
        )}
      </div> */}
    </>
  );
};

export default CreateSong;
