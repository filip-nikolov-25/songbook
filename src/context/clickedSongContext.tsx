import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface SelectSongType {
  selectedSong?: string | undefined;
  genre?: string | undefined;
  language?: string | undefined;
}
interface ContextData {
  selectedSong: SelectSongType;
  selectSong: (songName: string, genre: string, language: string) => void;
}

export const SelectedSongContext = createContext({} as ContextData);

const SelectedSongProvider = ({ children }: Props) => {
  const [selectedSong, setSelectedSong] = useState<SelectSongType>({
    selectedSong: "",
    genre: "",
    language: "",
  });


  const selectSong = (songName: string, genre: string, language: string) => {
    setSelectedSong({
      genre: genre,
      selectedSong: songName,
      language: language,
    });
  };

  return (
    <SelectedSongContext.Provider
      value={{
        selectedSong,
        selectSong,
      }}
    >
      {children}
    </SelectedSongContext.Provider>
  );
};
export default SelectedSongProvider;
