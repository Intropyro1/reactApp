import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var PlaylistListItem = function (_a) {
    var id = _a.id, name = _a.name, selectPlaylist = _a.selectPlaylist;
    return (_jsx("ul", { children: _jsxs("li", { children: [_jsx("p", { children: name }), _jsx("button", { type: "button", onClick: function () { return selectPlaylist(id); }, children: "Select" })] }, id) }));
};
export default PlaylistListItem;
