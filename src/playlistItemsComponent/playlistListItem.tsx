import React from "react";

interface PlaylistListItemProps {
  id: number | string;
  name?: string;
  selectPlaylist: (id: number | string) => void;
}

const PlaylistListItem: React.FC<PlaylistListItemProps> = ({
  id,
  name,
  selectPlaylist,
}) => {
  return (
    <ul>
      <li key={id}>
        <p>{name}</p>
        <button type="button" onClick={() => selectPlaylist(id)}>
          Select
        </button>
      </li>
    </ul>
  );
};

export default PlaylistListItem;
