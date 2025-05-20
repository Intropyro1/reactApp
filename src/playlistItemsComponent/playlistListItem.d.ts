import React from "react";
interface PlaylistListItemProps {
    id: number | string;
    name?: string;
    selectPlaylist: (id: number | string) => void;
}
declare const PlaylistListItem: React.FC<PlaylistListItemProps>;
export default PlaylistListItem;
