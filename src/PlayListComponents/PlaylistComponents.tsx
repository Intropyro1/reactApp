import React from "react";
import "./playList.css";
/*import TrackList from "./TrackList";
import TrackDisplay from "./TrackDisplay";
*/
interface PlaylistComponentsProps {
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlaylistComponents = ({ name, onChange }: PlaylistComponentsProps) => {
  return (
    <div className="">
      <div className="input-group">
        <label
          htmlFor="playlistName"
          className="input-group-text"
          id="addon-wrapping"
        >
          Name Your Playlist:{" "}
          <input
            type="text"
            id="playlistName"
            name="playlistName"
            placeholder="Enter Playlist Name"
            onChange={onChange}
            className="bg-secondary bg-gradient text-light"
          />
        </label>
      </div>
      <h2>
        <strong className="playlistName">{name}</strong>
      </h2>
    </div>
  );
};

export default PlaylistComponents;
