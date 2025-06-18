import ChooseKeyPopUp from "@/components/AddSongPage/ChooseKeyPopUp";
import CreateSong from "@/components/AddSongPage/CreateSong";
import { AllChords } from "@/types/types";
import { GetStaticProps } from "next";
import { useState } from "react";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";


interface Props {
  allChordsData: AllChords;
}

const AddSong = ({ allChordsData }: Props) => {
  const [chooseKey, setChooseKey] = useState<string>("");
  const [text, setText] = useState("");
  const [isChooseKeyPopUpOpen, setIsChooseKeyPopUpOpen] = useState(false);
  // const user = auth.currentUser;
  const [user,loading] = useAuthState(auth)


  if(loading) {
    <h1>LOADING LOADING</h1>
  }

  if(!user) {
    <h1>USER NOT FOUND</h1>
  }
  

   const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error sign out:", error);
    }
  };

  return (
    <>
      {user ? (
        <div className="bg-gradient-to-r min-h-screen from-[#751006] to-[#1f0021]">
          <CreateSong
            setText={setText}
            allChordsData={allChordsData}
            keyOfASong={chooseKey}
            text={text}
          />
          <div className="text-center mb-10">
            <button
              onClick={() => setIsChooseKeyPopUpOpen(!isChooseKeyPopUpOpen)}
              className="text-red-500  bg-black px-5 py-2  rounded-2xl"
            >
              Transpose your song
            </button>
          </div>
          {isChooseKeyPopUpOpen && (
            <ChooseKeyPopUp setChooseKey={setChooseKey} />
          )}
        </div>
      ) : (
        <h2>You are not logged in </h2>
      )}
      <button className="text-3xl bg-cyan-500" onClick={handleLogout}>SIGN OUT</button>
    </>
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
