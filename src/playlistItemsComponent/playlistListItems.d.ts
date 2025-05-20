import React from "react";
export interface Playlist {
    id: number | string;
    name: string;
    artist?: string;
    album?: string;
    uri?: string;
    imageUrl?: string;
}
interface PlaylistItemsProps {
    selectPlaylist: (id: number | string) => void;
}
declare const PlaylistListItems: React.FC<PlaylistItemsProps>;
export default PlaylistListItems;
