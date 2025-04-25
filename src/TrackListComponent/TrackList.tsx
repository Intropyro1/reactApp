import React from "react";
import TrackDisplay from "../TrackDisplayComponent/TrackDisplay";
import { Image } from "@spotify/web-api-ts-sdk";

export interface Track {
  name: string;
  artist: string;
  album: string;
  id?: string | number;
  uri: string; // Assuming images is  an array of strings
}

interface TrackListProps {
  tracks: Track[];
  onAdd: (track: Track) => void;
  onRemove: (track: Track) => void;
  isRemoval: boolean;
}

const TrackList: React.FC<TrackListProps> = (props) => {
  return (
    <div className="resultTracksComponent">
      <>
        {props.tracks.map((track) => (
          <div key={track.id}>
            <TrackDisplay
              name={track.name}
              artist={track.artist}
              album={track.album}
            />
            <button
              type="button"
              onClick={() => {
                if (props.isRemoval) {
                  props.onRemove(track);
                } else {
                  props.onAdd(track);
                }
              }}
            >
              {props.isRemoval ? "-" : "+"}
            </button>
          </div>
        ))}
      </>
    </div>
  );
};

export default TrackList;
