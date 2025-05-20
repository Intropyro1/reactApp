import React from "react";
import { Track } from "../TrackListComponent/TrackList";
interface searchResultsProps {
    searchTerm: Track[] | Array<Track>;
    onAdd: (track: Track) => void;
}
declare const SearchResults: React.FC<searchResultsProps>;
export default SearchResults;
