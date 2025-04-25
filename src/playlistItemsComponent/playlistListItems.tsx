import React, { useEffect, useState } from "react";
import Spotify from "../SpotifyComponent/script";
import PlaylistListItem from "./playlistListItem";

export interface Playlist {
  id: string;
  name: string;
}

interface PlaylistItemsProps {
  selectPlaylist: (id: string) => void; // Add selectPlaylist as a prop
}

const PlaylistListItems: React.FC<PlaylistItemsProps> = ({
  selectPlaylist,
}) => {
  const [playListlist, setplayListlist] = useState<Playlist[]>([]);

  let randomkey: string = `//Wne`;
  let increment: number = 0;

  const keyGen = () => {
    increment++;
    let newKey = randomkey + increment;
    return newKey;
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlists = await Spotify.getUserPlaylists();
      setplayListlist(playlists);
    };
    fetchPlaylists();
  }, []);

  return (
    <div>
      <h2>Local PlayLists</h2>
      <ul>
        {playListlist.map((playlist) => (
          <li key={keyGen() + playlist.id}>
            <PlaylistListItem
              id={playlist.id}
              name={playlist.name}
              selectPlaylist={selectPlaylist}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistListItems;
