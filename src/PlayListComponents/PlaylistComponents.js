import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./playList.css";
var PlaylistComponents = function (_a) {
    var playList = _a.playList, isSectionVisible = _a.isSectionVisible, setPlaylist = _a.setPlaylist, savePlaylist = _a.savePlaylist, name = _a.name, onChange = _a.onChange, toggleSectionVisibility = _a.toggleSectionVisibility;
    return (_jsxs("div", { className: "playlistComponent", children: [_jsx("div", { className: "input-group", children: _jsxs("label", { htmlFor: "playlistName", className: "input-group-text", id: "addon-wrapping", children: ["Name Your Playlist:", " ", _jsx("input", { type: "text", id: "playlistName", name: "playlistName", placeholder: "Enter Playlist Name", onChange: onChange, className: "bg-secondary bg-gradient text-light" })] }) }), _jsx("h2", { children: _jsx("strong", { className: "playlistName", children: name }) }), _jsx("div", { className: "playlistComponent-display", children: _jsxs("section", { className: "playlistSection", children: [isSectionVisible ? (_jsx("div", { className: "playlist-Display", children: _jsx("ul", { className: "list-group list-group-vertical", children: playList.map(function (track) { return (_jsxs("li", { className: "list-group-item bg-success text-light", children: [track.name, " by ", track.artist, _jsx("button", { className: "btn btn-outline-danger btn-sm", type: "button", onClick: function () {
                                                return setPlaylist(playList.filter(function (a) { return a.id !== track.id; }));
                                            }, children: "-" })] }, track.id)); }) }) })) : (_jsx("p", { children: "Playlist is empty" })), _jsxs("button", { type: "submit", className: "btn btn-outline-dark text-light", onClick: function (event) {
                                event.preventDefault();
                                savePlaylist();
                            }, children: ["Add to Spotify Playlist", " "] }), _jsx("div", { className: "hidePlaylistButton", children: _jsx("button", { type: "button", onClick: toggleSectionVisibility, className: "btn btn-warning", children: isSectionVisible ? "Hide Playlist" : "Show Playlist" }) })] }) })] }));
};
export default PlaylistComponents;
