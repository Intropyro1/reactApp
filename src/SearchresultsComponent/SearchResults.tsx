import React, { TrackHTMLAttributes, useState } from "react";
import { Track } from "../TrackListComponent/TrackList"; // Import Track interface from TrackList

interface searchResultsProps {
  searchTerm: Track[] | Array<Track>; // Array of tracks to search
  onAdd: (track: Track) => void; // Callback function to add to playlist
}

const SearchResults: React.FC<searchResultsProps> = ({ searchTerm, onAdd }) => {
  return (
    <div>
      <div className="card">
        <h4 className="card-header">Search Results:</h4>
      </div>
      <div className="searchResults-display bg-light d-flex justify-content-start">
        <ul className="list-group list-group-flush">
          {searchTerm.slice().map((track) => (
            <li
              id="songDisplays"
              className="list-group-item listModifications"
              key={track.id}
            >
              <strong>{track.name}</strong> by <em>{track.artist}</em> (Album:{" "}
              {track.album})
              <button
                className="btn btn-outline-success btn-sm"
                type="button"
                onClick={() => onAdd(track)}
              >
                +
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
