export interface SongRecord {
  text: string;
  artist?: string;
  author?: string;
  authorId?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface SongDB {
  [genre: string]: {
    [language: string]: {
      [songName: string]: SongRecord;
    };
  };
}

export interface SongSummary {
  name: string;
  artist: string;
  genre: string;
  language: string;
  author?: string;
  authorId?: string;
  createdAt?: number;
}
