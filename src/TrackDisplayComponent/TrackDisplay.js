import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var TrackDisplay = function (props) {
    return (_jsx("div", { className: "TrackDisplay card text-center mb-3 text-bg-success ", children: _jsxs("div", { className: "Track-Display-Information card-body", children: [_jsx("p", { children: "#1" }), _jsx("h2", { className: "card-title", children: props.name }), _jsx("div", { className: "card-body", children: _jsxs("p", { className: "card-text", children: ["by ", props.artist, " on ", props.album] }) })] }) }));
};
export default TrackDisplay;
