import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GetStaticProps } from "next";

import ChooseKeyPopUp from "@/components/AddSongPage/ChooseKeyPopUp";
import CreateSong from "@/components/AddSongPage/CreateSong";
import Loading from "@/components/base/Loading";
import NoUserComponent from "@/components/base/NoUserComponent";
import { auth } from "@/firebase";
import { AllChords } from "@/types/types";

interface Props {
  allChordsData: AllChords;
}

const AddSong = ({ allChordsData }: Props) => {
  const [chooseKey, setChooseKey] = useState<string>("");
  const [text, setText] = useState("");
  const [isChooseKeyPopUpOpen, setIsChooseKeyPopUpOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;
  if (!user) return <NoUserComponent />;

  return (
    <main className="min-h-screen bg-[#0f0f12] py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Create New Song</h1>
          <p className="text-gray-400">Compose and manage your chords</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-2xl">
          <CreateSong
            setText={setText}
            allChordsData={allChordsData}
            keyOfASong={chooseKey}
            text={text}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsChooseKeyPopUpOpen(!isChooseKeyPopUpOpen)}
            className="group relative px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-500/20"
          >
            {isChooseKeyPopUpOpen ? "Close Transposer" : "Transpose your song"}
          </button>
        </div>

        {isChooseKeyPopUpOpen && (
          <div className="animate-in fade-in zoom-in duration-200">
            <ChooseKeyPopUp setChooseKey={setChooseKey} />
          </div>
        )}
      </div>
    </main>
  );
};

export default AddSong;

export const getStaticProps: GetStaticProps = async () => {
  const chordRes = await fetch("http://localhost:5000/allChords");
  const allChordsData = await chordRes.json();

  return { props: { allChordsData } };
};