import React, { useCallback, useRef, useState } from "react";
import { Avatar, Button, GroupBox, Slider } from "react95";
import Image from "next/image";
import { SongResponse } from "@/types/song.response";
import { useGlobalShortcut } from "@/hooks/tauri/shortcuts";

type AudioPlayerProps = {
  song: SongResponse;
};

const AudioPlayer = ({ song }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  //   const shortcutHandler = useCallback(() => {
  //     playOrPauseAudio();
  //   }, []);
  //   useGlobalShortcut("Space", shortcutHandler);

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
    <div className="sticky z-10 bottom-0 left-0 right-0 p-4 bg-background">
      <GroupBox className="flex flex-col gap-2" label="Now Playing">
        <audio
          ref={audioRef}
          autoPlay
          src={
            song.data[0].downloadUrl.filter(
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
                  song?.data?.[0]?.image?.find(
                    (img) => img.quality === "150x150"
                  )?.url ?? ""
                }
                width={64}
                height={64}
                alt="Song cover"
              />
            </Avatar>
            <div>
              <h1
                className="font-bold text-lg"
                dangerouslySetInnerHTML={{ __html: song.data[0].name }}
              ></h1>
              <p className="text-gray-500">
                {song.data[0].artists.primary[0].name}
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
          <span>{new Date(progress * 1000).toISOString().substr(11, 8)}</span>
          <span>/</span>
          <span>{new Date(duration! * 1000).toISOString().substr(11, 8)}</span>
        </div>
      </GroupBox>
    </div>
  );
};

export default AudioPlayer;
