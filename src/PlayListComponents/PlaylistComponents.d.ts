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
declare const PlaylistComponents: React.FC<PlaylistComponentsProps>;
export default PlaylistComponents;
