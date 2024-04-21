export interface SearchResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  total: number;
  start: number;
  results: SongResult[];
}

export interface SongResult {
  id: string;
  name: string;
  type: ResultType;
  year: string;
  releaseDate: null;
  duration: number;
  label: string;
  explicitContent: boolean;
  playCount: number;
  language: Language;
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
  featured: All[];
  all: All[];
}

export interface All {
  id: string;
  name: string;
  role: Role;
  image: DownloadURL[];
  type: AllType;
  url: string;
}

export interface DownloadURL {
  quality: Quality;
  url: string;
}

export enum Quality {
  The12Kbps = "12kbps",
  The150X150 = "150x150",
  The160Kbps = "160kbps",
  The320Kbps = "320kbps",
  The48Kbps = "48kbps",
  The500X500 = "500x500",
  The50X50 = "50x50",
  The96Kbps = "96kbps",
}

export enum Role {
  FeaturedArtists = "featured_artists",
  Lyricist = "lyricist",
  Music = "music",
  PrimaryArtists = "primary_artists",
  Singer = "singer",
  Starring = "starring",
}

export enum AllType {
  Artist = "artist",
}

export enum Language {
  English = "english",
  Haryanvi = "haryanvi",
  Hindi = "hindi",
}

export enum ResultType {
  Song = "song",
}
