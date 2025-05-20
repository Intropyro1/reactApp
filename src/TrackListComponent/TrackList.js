import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import TrackDisplay from "../TrackDisplayComponent/TrackDisplay";
var TrackList = function (props) {
    return (_jsx("div", { className: "resultTracksComponent", children: _jsx(_Fragment, { children: props.tracks.map(function (track) { return (_jsxs("div", { children: [_jsx(TrackDisplay, { name: track.name, artist: track.artist, album: track.album }), _jsx("button", { type: "button", onClick: function () {
                            if (props.isRemoval) {
                                props.onRemove(track);
                            }
                            else {
                                props.onAdd(track);
                            }
                        }, children: props.isRemoval ? "-" : "+" })] }, track.id)); }) }) }));
};
export default TrackList;
