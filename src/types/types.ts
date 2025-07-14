export interface ChordType {
  id: number;
  chordScale: string[];
}

export interface AllChords {
  cMajorORaMinor: ChordType;
  cSharpMajorORbMinor: ChordType;
  dMajorORhMinor: ChordType;
  dSharpMajorORcMinor: ChordType;
  eMajorORcSharpMinor: ChordType;
  fMajorORaMinor: ChordType;
  fSharpMajorORdSharpMinor: ChordType;
  gMajorORdeMinor: ChordType;
  gSharpMajorORdFMinor: ChordType;
  aMajorORfSharpMinor: ChordType;
  bMajorORgMinor: ChordType;
  hMajorORgSharpMinor: ChordType;
}
export interface SongType {
  name: string;
  text: string;
}

export interface MusicStyleType {
  genre?: string;
  language?: string;
}
export interface SongDB {
  [genre: string]: {
    [language: string]: {
      [songName: string]: {
        text: string;
      };
    };
  };
}
