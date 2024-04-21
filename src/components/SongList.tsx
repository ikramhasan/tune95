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
import { SongResult } from "@/types/search.response";

type SongListComponentProps = {
  songs: SongResult[] | undefined;
  onClick: (song: SongResult) => void;
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
                dangerouslySetInnerHTML={{ __html: song.name }}
              ></TableDataCell>
              <TableDataCell
                dangerouslySetInnerHTML={{
                  __html: song.artists.primary[0].name,
                }}
              ></TableDataCell>
              <TableDataCell
                dangerouslySetInnerHTML={{ __html: song.album.name }}
              ></TableDataCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default SongList;
