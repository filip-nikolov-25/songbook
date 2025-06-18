import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface ContextData {
  selectedSong: string;
  selectSong: (songName: string) => void;
}

export const SelectedSongContext = createContext({} as ContextData);

const SelectedSongProvider = ({ children }: Props) => {
  const [selectedSong, setSelectedSong] = useState("");

  const selectSong = (songName: string) => {
    setSelectedSong(songName);
  };

 return <SelectedSongContext.Provider
    value={{
      selectedSong,
      selectSong,
    }}
  >
    {children}
  </SelectedSongContext.Provider>;
};
export default SelectedSongProvider