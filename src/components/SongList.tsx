import React from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "react95";
import Image from "next/image";
import { SongsResult } from "@/types/search.response";

type SongListComponentProps = {
  songs: SongsResult[] | undefined;
  onClick: (song: SongsResult) => void;
};

const SongList = ({ songs, onClick }: SongListComponentProps) => {
  return (
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
        {songs &&
          songs.map((song) => (
            <TableRow
              key={song.id}
              className="hover:cursor-pointer"
              onClick={() => {
                onClick(song);
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
  );
};

export default SongList;
