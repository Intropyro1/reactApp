import React from "react";
import "./playList.css";
import { Track } from "../TrackListComponent/TrackList";

interface PlaylistComponentsProps {
  name?: string;
  playList: Track[];
  isSectionVisible: boolean;
  setPlaylist: React.Dispatch<React.SetStateAction<Track[]>>;
  savePlaylist: () => Promise<void>;
  toggleSectionVisibility: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlaylistComponents: React.FC<PlaylistComponentsProps> = ({
  playList,
  isSectionVisible,
  setPlaylist,
  savePlaylist,
  name,
  onChange,
  toggleSectionVisibility,
}) => {
  return (
    <div className="playlistComponent">
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
      <div className="playlistComponent-display">
        <section className="playlistSection">
          {isSectionVisible ? (
            <div className="playlist-Display">
              <ul className="list-group list-group-vertical">
                {playList.map((track) => (
                  <li
                    className="list-group-item bg-success text-light"
                    key={track.id}
                  >
                    {track.name} by {track.artist}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() =>
                        setPlaylist(playList.filter((a) => a.id !== track.id))
                      }
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Playlist is empty</p>
          )}
          <button
            type="submit"
            className="btn btn-outline-dark text-light"
            onClick={(event) => {
              event.preventDefault();
              savePlaylist();
            }}
          >
            Add to Spotify Playlist{" "}
          </button>
          <div className="hidePlaylistButton">
            <button
              type="button"
              onClick={toggleSectionVisibility}
              className="btn btn-warning"
            >
              {isSectionVisible ? "Hide Playlist" : "Show Playlist"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlaylistComponents;
