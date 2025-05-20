import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var SearchResults = function (_a) {
    var searchTerm = _a.searchTerm, onAdd = _a.onAdd;
    return (_jsxs("div", { children: [_jsx("div", { className: "card", children: _jsx("h4", { className: "card-header", children: "Search Results:" }) }), _jsx("div", { className: "searchResults-display bg-light d-flex justify-content-start", children: _jsx("ul", { className: "list-group list-group-flush", children: searchTerm.slice().map(function (track) { return (_jsxs("li", { id: "songDisplays", className: "list-group-item listModifications", children: [_jsx("strong", { children: track.name }), " by ", _jsx("em", { children: track.artist }), " (Album:", " ", track.album, ")", _jsx("button", { className: "btn btn-outline-success btn-sm", type: "button", onClick: function () { return onAdd(track); }, children: "+" })] }, track.id)); }) }) })] }));
};
export default SearchResults;
