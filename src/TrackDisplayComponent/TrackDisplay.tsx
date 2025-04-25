import React from "react";
/*import { useCallback } from "react";
import tracks from "./Track";
import { Track } from "./TrackList";
*/
export interface TrackDisplayProps {
  name?: string | undefined;
  id?: string | number;
  artist?: string;
  album?: string;
}

const TrackDisplay: React.FC<TrackDisplayProps> = (props) => {
  return (
    <div className="TrackDisplay card text-center mb-3 text-bg-success ">
      <div className="Track-Display-Information card-body">
        <p>#1</p>
        <h2 className="card-title">{props.name}</h2>
        <div className="card-body">
          <p className="card-text">
            by {props.artist} on {props.album}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackDisplay;
