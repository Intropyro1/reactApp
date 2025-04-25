import React, { TrackHTMLAttributes, useState } from "react";
import { Track } from "../TrackListComponent/TrackList"; // Import Track interface from TrackList

interface searchResultsProps {
  tracks: Track[]; // Array of tracks to filter
  searchTerm: Track[] | string | Array<Track>; // Array of tracks to search
  onAdd: (track: Track) => void; // Callback function to add to playlist
}

const SearchResults: React.FC<searchResultsProps> = ({
  searchTerm,
  tracks,
}) => {
  return (
    <div>
      <div className="card">
        <h4 className="card-header">Search Results:</h4>
      </div>
    </div>
  );
};

export default SearchResults;
