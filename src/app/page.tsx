"use client";

import AudioPlayer from "@/components/AudioPlayer";
import FullScreenLoader from "@/components/Loader";
import SongList from "@/components/SongList";
import { SearchResponse } from "@/types/search.response";
import { SongResponse } from "@/types/song.response";
import { ChangeEvent, useRef, useState } from "react";
import { Button, GroupBox, TextInput } from "react95";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResponse, setSearchResponse] = useState<SearchResponse>();
  const [nowPlaying, setNowPlaying] = useState<SongResponse | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value);
  }

  function playSong(song: SearchResponse["data"]["songs"]["results"][0]): void {
    console.log("Selected song", song);

    fetch(`https://saavn.dev/api/songs/${song.id}`).then((response) =>
      response.json().then((data) => {
        console.log(data);
        setNowPlaying(data);
      })
    );
  }

  function search(e: any): void {
    if (e.type === "click" || e.key === "Enter") {
      if (query === "") return;
      setLoading(true);

      fetch(`https://saavn.dev/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSearchResponse(data);
          setLoading(false);
        });
    }
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <GroupBox label="Search">
        <div className="flex">
          <TextInput
            placeholder="Type here..."
            onChange={handleChange}
            onKeyDown={search}
            fullWidth
          />
          <Button onClick={search} style={{ marginLeft: 4 }}>
            Search
          </Button>
        </div>
      </GroupBox>

      {loading ? (
        <FullScreenLoader />
      ) : searchResponse ? (
        <SongList
          songs={searchResponse?.data.songs.results}
          onClick={(song) => {
            playSong(song);
          }}
        />
      ) : (
        <div>Search by title, artist, album, etc.</div>
      )}

      {nowPlaying && <AudioPlayer song={nowPlaying} />}
    </div>
  );
}
