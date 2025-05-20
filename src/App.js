var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import SearchBar from "./SearchBarComponents/searchBar";
import SearchResults from "./SearchresultsComponent/SearchResults";
import PlaylistComponents from "./PlayListComponents/PlaylistComponents";
import TrackDisplay from "./TrackDisplayComponent/TrackDisplay";
import Spotify from "./SpotifyComponent/script";
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { clientId, redirectUri } from "./SpotifyComponent/script";
import PlaylistListItems from "./playlistItemsComponent/playlistListItems";
import LogInComponent from "./LoginButton/logInComponent";
/*let nextId = 0; */
var App = function () {
    var _a, _b, _c, _d, _e;
    var _f = useState([]), searchTerm = _f[0], setSearchTerm = _f[1];
    var _g = useState(true), isSectionVisible = _g[0], setIsSectionVisible = _g[1];
    var _h = useState([]), playList = _h[0], setPlaylist = _h[1];
    var _j = useState([]), playlistTracks = _j[0], setPlaylistTracks = _j[1];
    var _k = useState("New Playlist"), playlistName = _k[0], setPlaylistName = _k[1];
    var _l = useState(null), playlistId = _l[0], setPlaylistId = _l[1];
    var _m = useState(false), isLoggedIn = _m[0], setIsLoggedIn = _m[1];
    var handleLogin = function () {
        var scopes = "playlist-modify-public";
        var accessUrl = "https://accounts.spotify.com/authorize?client_id=".concat(clientId, "&response_type=token&scope=").concat(scopes, "&redirect_uri=").concat(redirectUri);
        window.location.href = accessUrl;
    };
    useEffect(function () {
        try {
            var hash = window.location.hash;
            if (hash) {
                var tokenMatch = hash.match(/access_token=([^&]*)/);
                if (tokenMatch) {
                    var token = tokenMatch[1];
                    Spotify.setAccessToken(token);
                    localStorage.setItem("token", token);
                    setIsLoggedIn(true);
                    window.history.pushState("", document.title, window.location.pathname);
                }
            }
        }
        catch (error) {
            console.error("Error checking access token:", error);
            setIsLoggedIn(false);
        }
    }, []);
    var handleLogout = function () {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        Spotify.clearAccessToken();
        setPlaylist([]);
        setSearchTerm([]);
        window.location.href = "".concat(redirectUri);
    };
    /*
    const directLogin = async () => {
      try {
        //Generating code verifier and code challenge
        const { codeVerifier, codeChallenge } =
          await Spotify.generateCodeChallenge();
        // Storing code verifier in local storage
        localStorage.setItem("code_verifier", codeVerifier);
        //Defining Scopes to interact with Spotify API
        const scopes = "playlist-modify-public";
        //Generating authorization URL
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&scope=${scopes}&redirect_uri=${redirectUri}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
        //Redirecting to Spotify's authorization page
        window.location.href = authUrl;
      } catch (error) {
        console.error("Error during login:", error);
      }
    };
    useEffect(() => {
      const handleRedirect = async () => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
          try {
            // Retrieving code verifier from local storage
            const codeVerifier = localStorage.getItem("code_verifier");
            if (!codeVerifier) {
              throw new Error("Code verifier not found in local storage.");
            }
            //Exchanging authorization code for access token
            const tokenResponse = await Spotify.exchangeAuthorizationCode(
              code,
              codeVerifier
            );
  
            //saving the access token in local variable
            const token = tokenResponse.access_token;
  
            //saving the token in local storage
            Spotify.setAccessToken(token);
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
            //Clearing the URL hash to remove sensitive information
            window.history.pushState(
              "",
              document.title,
              window.location.pathname
            );
          } catch (error) {
            console.error("Error during token exchange:", error);
            setIsLoggedIn(false);
          }
        }
      };
  
      handleRedirect();
    }, []);
  */
    var search = useCallback(function (term) {
        if (!isLoggedIn) {
            alert("Please log in to Spotify first.");
            return;
        }
        var token = Spotify.getAccessToken();
        if (!token) {
            alert("Please log in to Spotify first.");
            return;
        }
        Spotify.search(term).then(setSearchTerm);
    }, [isLoggedIn]);
    useEffect(function () {
        var storedTerm = localStorage.getItem("userInput");
        if (storedTerm) {
            Spotify.search(storedTerm).then(setSearchTerm);
            localStorage.removeItem("userInput");
        }
    }, []);
    var addToTrack = useCallback(function (track) {
        if (playlistTracks.some(function (savedTrack) { return savedTrack.id === track.id; })) {
            setPlaylistTracks(function (prevTracks) { return __spreadArray(__spreadArray([], prevTracks, true), [track], false); });
            return;
        }
    }, [playlistTracks]);
    var toggleSectionVisibility = function () {
        setIsSectionVisible(function (prevState) { return !prevState; }); // Toggle visibility
    };
    var selectPlaylist = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var playlistId_1, tracks, selectedPlaylist, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    playlistId_1 = String(id);
                    return [4 /*yield*/, Spotify.getPlaylistId(playlistId_1)];
                case 1:
                    tracks = _a.sent();
                    setPlaylistTracks(tracks);
                    setPlaylistId(id);
                    selectedPlaylist = playList.find(function (playList) { return playList.id === id; });
                    if (selectedPlaylist) {
                        setPlaylistName(selectedPlaylist.name);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log("Error selecting playlist:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (event) {
        event.preventDefault();
        console.log("Search term submitted: ", searchTerm);
        if (searchTerm.length > 0) {
            console.log("first search term: ", searchTerm[0]);
        }
    };
    var matchingTrack = searchTerm.filter(function (track) {
        var _a;
        return ((_a = searchTerm[0]) === null || _a === void 0 ? void 0 : _a.name) &&
            track.name.toLowerCase().includes(searchTerm[0].name.toLowerCase());
    } // Assuming you want the first matching track
    );
    var savePlaylist = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var trackUris, playListId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trackUris = playList.map(function (track) { return track.uri; });
                    playListId = String(playlistId);
                    return [4 /*yield*/, Spotify.savePlaylist(playlistName, trackUris, playListId).then(function () {
                            setPlaylistName(playlistName);
                            setPlaylistTracks([]);
                            setPlaylistId(null);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [playlistName, playlistTracks, playlistId]);
    var handlePlayListNameChange = function (e) {
        setPlaylistName(e.target.value);
    };
    var resultsDisplayButtonHandler = function (track) {
        if (!playList.some(function (addedTrack) { return addedTrack.id === track.id; })) {
            setPlaylist(__spreadArray(__spreadArray([], playList, true), [
                {
                    id: track.id,
                    name: track.name,
                    artist: track.artist,
                    album: track.album,
                    uri: track.uri,
                },
            ], false));
            setIsSectionVisible(true);
        }
        else {
            return alert("Track exists in Playlist Already");
        }
    };
    return (_jsxs("div", { className: "App-display", children: [_jsx("div", { className: "searchBarSection", children: _jsx(SearchBar, { handleSubmit: handleSubmit, onSearch: search }) }), _jsx(LogInComponent, { isLoggedIn: isLoggedIn, handleLogin: handleLogin, handleLogout: handleLogout }), _jsx("hr", {}), _jsx("div", { className: "searchResultsSection", children: _jsx(SearchResults, { searchTerm: searchTerm, onAdd: function (track) { return resultsDisplayButtonHandler(track); } }) }), _jsx("div", { className: "playlistDiv", children: _jsx(PlaylistComponents, { name: playlistName, playList: playList, isSectionVisible: isSectionVisible, setPlaylist: setPlaylist, savePlaylist: savePlaylist, toggleSectionVisibility: toggleSectionVisibility, onChange: handlePlayListNameChange }) }), _jsx("div", { className: "userLocalPlaylistDisplay", children: !isLoggedIn ? (_jsx("p", { children: "Please log in to view your playlists." })) : (_jsx(PlaylistListItems, { selectPlaylist: selectPlaylist })) }), _jsx("div", { className: "trackDisplayDiv", children: matchingTrack ? (_jsxs("div", { className: "trackDisplaySection d-flex justify-content-center", children: [_jsx("img", { src: ((_a = searchTerm[0]) === null || _a === void 0 ? void 0 : _a.imageUrl) || "reactApp/public/musicalNote.jpg", alt: ((_b = searchTerm[0]) === null || _b === void 0 ? void 0 : _b.name) || "Track Image", className: "imageDisplay" }), _jsx(TrackDisplay, { name: ((_c = searchTerm[0]) === null || _c === void 0 ? void 0 : _c.name) || "", artist: ((_d = searchTerm[0]) === null || _d === void 0 ? void 0 : _d.artist) || "", album: ((_e = searchTerm[0]) === null || _e === void 0 ? void 0 : _e.album) || "" })] })) : (_jsx("p", { children: "No matching track found." })) })] }));
};
export default App;
