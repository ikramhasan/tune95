export interface SearchResponse {
  success: boolean;
  data: DataClass;
}

export interface DataClass {
  topQuery: Artists;
  songs: Songs;
  albums: Albums;
  artists: Artists;
  playlists: Playlists;
}

export interface Albums {
  results: AlbumsResult[];
  position: number;
}

export interface AlbumsResult {
  id: string;
  title: string;
  image: Image[];
  artist: string;
  url: string;
  type: string;
  description: string;
  year: string;
  songIds: string;
  language: string;
}

export interface Image {
  quality: Quality;
  url: string;
}

export enum Quality {
  The150X150 = "150x150",
  The500X500 = "500x500",
  The50X50 = "50x50",
}

export interface Artists {
  results: ArtistsResult[];
  position: number;
}

export interface ArtistsResult {
  id: string;
  title: string;
  image: Image[];
  type: string;
  description: string;
  position?: number;
}

export interface Playlists {
  results: PlaylistsResult[];
  position: number;
}

export interface PlaylistsResult {
  id: string;
  title: string;
  image: Image[];
  url: string;
  type: string;
  language: string;
  description: string;
}

export interface Songs {
  results: SongsResult[];
  position: number;
}

export interface SongsResult {
  id: string;
  title: string;
  image: Image[];
  album: string;
  url: string;
  type: string;
  description: string;
  primaryArtists: string;
  singers: string;
  language: string;
}
