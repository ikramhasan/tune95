"use client";

import { SearchResponse } from "@/types/search.response";
import { SongResponse } from "@/types/song.response";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import {
  Avatar,
  Button,
  GroupBox,
  Hourglass,
  ProgressBar,
  Slider,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "react95";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResponse, setSearchResponse] = useState<SearchResponse>();
  const [nowPlaying, setNowPlaying] = useState<SongResponse | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  function playOrPauseAudio(): void {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setIsPaused(false);
    } else {
      audioRef.current?.pause();
      setIsPaused(true);
    }
  }

  const handleProgressUpdate = () => {
    setProgress(audioRef.current?.currentTime ?? 0);
  };

  const handleTimeChange = (time: number) => {
    console.log(event);
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration);
  };

  function stopAudio(): void {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(0);
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
        <div className="flex h-full w-full items-center justify-center">
          <Hourglass className="w-32 h-32" />
        </div>
      ) : (
        <Table className="mb-2">
          <TableHead>
            <TableRow>
              <TableHeadCell>Cover</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Artist</TableHeadCell>
              <TableHeadCell>Album</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResponse?.data.songs.results.map((song) => (
              <TableRow
                key={song.id}
                className="hover:cursor-pointer"
                onClick={() => {
                  playSong(song);
                }}
              >
                <TableDataCell>
                  <Avatar square size={64}>
                    <Image
                      src={
                        song.image.filter((img) => img.quality === "150x150")[0]
                          .url
                      }
                      width={64}
                      height={64}
                      alt="Song cover"
                    />
                  </Avatar>
                </TableDataCell>
                <TableDataCell
                  dangerouslySetInnerHTML={{ __html: song.title }}
                ></TableDataCell>
                <TableDataCell
                  dangerouslySetInnerHTML={{ __html: song.primaryArtists }}
                ></TableDataCell>
                <TableDataCell
                  dangerouslySetInnerHTML={{ __html: song.album }}
                ></TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {nowPlaying && (
        <div className="absolute z-10 bottom-0 left-0 right-0 p-4">
          <GroupBox className="flex flex-col gap-2" label="Now Playing">
            <audio
              ref={audioRef}
              autoPlay
              src={
                nowPlaying.data[0].downloadUrl.filter(
                  (url) => url.quality === "320kbps"
                )[0].url
              }
              onTimeUpdate={handleProgressUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            ></audio>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <Avatar square size={64}>
                  <Image
                    src={
                      nowPlaying?.data?.[0]?.image?.find(
                        (img) => img.quality === "150x150"
                      )?.url ?? ""
                    }
                    width={64}
                    height={64}
                    alt="Song cover"
                  />
                </Avatar>
                <div>
                  <h1 className="font-bold text-lg">
                    {nowPlaying.data[0].name}
                  </h1>
                  <p className="text-gray-500">
                    {nowPlaying.data[0].artists.primary[0].name}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="raised"
                  square
                  onClick={() => {
                    playOrPauseAudio();
                  }}
                >
                  <span role="img">{isPaused ? "►" : "⏸︎"}</span>
                </Button>
                <Button
                  variant="raised"
                  square
                  onClick={() => {
                    stopAudio();
                  }}
                >
                  <span role="img">⏹︎</span>
                </Button>
              </div>
            </div>
            <Slider
              min={0}
              value={progress}
              max={duration}
              onChange={handleTimeChange}
            />
            <div className="flex w-full justify-end gap-1">
              <span>
                {new Date(progress * 1000).toISOString().substr(11, 8)}
              </span>
              <span>/</span>
              <span>
                {new Date(duration! * 1000).toISOString().substr(11, 8)}
              </span>
            </div>
          </GroupBox>
        </div>
      )}
    </div>
  );
}
