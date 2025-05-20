import React from "react";
export interface Track {
    name: string;
    artist: string;
    album: string;
    id?: string | number;
    uri: string;
}
interface TrackListProps {
    tracks: Track[];
    onAdd: (track: Track) => void;
    onRemove: (track: Track) => void;
    isRemoval: boolean;
}
declare const TrackList: React.FC<TrackListProps>;
export default TrackList;
