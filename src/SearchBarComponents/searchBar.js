import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
var SearchBar = function (_a) {
    var onSearch = _a.onSearch;
    var _b = React.useState(""), term = _b[0], setTerm = _b[1]; // State to hold the search term
    var handleChange = function (event) {
        setTerm(event.target.value); // Update the search term in the parent component
        console.log("Search term changed: ", event.target.value); // Log the search term to the console
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        console.log("Search term submitted: ", term);
        if (onSearch && term) {
            onSearch(term); // Call the onSearch function with the search term
        }
    };
    return (_jsx("div", { className: "input-group input-group-lg mb-3 badge", children: _jsx("label", { htmlFor: "searchBar", className: "input-group mb-2", children: _jsxs("form", { onSubmit: handleSubmit, className: "input-group mb-3", children: [_jsx("input", { id: "searchBar", type: "text", name: "searchBar", onChange: handleChange, value: term, className: "form-control", placeholder: "Search for Song, Artist, Album" }), _jsx("button", { type: "submit", className: "btn btn-outline-secondary", children: "Search" })] }) }) }));
};
export default SearchBar;
