import React from "react";
export interface TrackDisplayProps {
    name?: string | undefined;
    id?: string | number;
    artist?: string;
    album?: string;
}
declare const TrackDisplay: React.FC<TrackDisplayProps>;
export default TrackDisplay;
