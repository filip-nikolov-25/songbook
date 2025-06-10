import ChooseKeyPopUp from "@/components/AddSongPage/ChooseKeyPopUp";
import CreateSong from "@/components/AddSongPage/CreateSong";
import { AllChords } from "@/types/types";
import { GetStaticProps } from "next";
import { useState } from "react";

interface Props {
  allChordsData: AllChords;
}

const AddSong = ({ allChordsData }: Props) => {
  const [chooseKey, setChooseKey] = useState<string>("");
  const [text, setText] = useState("");
  const [isChooseKeyPopUpOpen, setIsChooseKeyPopUpOpen] =
    useState(false);

  return (
    <div className="bg-gradient-to-r from-[#751006] to-[#1f0021]">
      <CreateSong
        setText={setText}
        allChordsData={allChordsData}
        keyOfASong={chooseKey}
        text={text}
      />
      {/* <button onClick={() => setIsChooseKeyPopUpOpen(!isChooseKeyPopUpOpen)} className="text-white bg-cyan-500">Transpose your song</button> */}
      {isChooseKeyPopUpOpen &&  <ChooseKeyPopUp setChooseKey={setChooseKey} />}
    </div>
  );
};

export default AddSong;

export const getStaticProps: GetStaticProps = async () => {
  const chordRes = await fetch("http://localhost:5000/allChords");
  const allChordsData = await chordRes.json();
  
  return {
    props: {
      allChordsData,
    },
  };
};
