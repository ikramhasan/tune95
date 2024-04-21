export interface SongResponse {
  success: boolean;
  data: Datum[];
}

export interface Datum {
  id: string;
  name: string;
  type: string;
  year: string;
  releaseDate: Date;
  duration: number;
  label: string;
  explicitContent: boolean;
  playCount: number;
  language: string;
  hasLyrics: boolean;
  lyricsId: null;
  url: string;
  copyright: string;
  album: Album;
  artists: Artists;
  image: DownloadURL[];
  downloadUrl: DownloadURL[];
}

export interface Album {
  id: string;
  name: string;
  url: string;
}

export interface Artists {
  primary: All[];
  featured: any[];
  all: All[];
}

export interface All {
  id: string;
  name: string;
  role: string;
  image: DownloadURL[];
  type: Type;
  url: string;
}

export interface DownloadURL {
  quality: string;
  url: string;
}

export enum Type {
  Artist = "artist",
}
