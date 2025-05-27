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
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
// Declare missing variables
var accessToken = ''; // Access token for Spotify API
export var clientId = 'f26484d0771f46d1af9661203413a716'; // Replace with your Spotify client ID
export var redirectUri = 'http://localhost:5173/'; // Replace with your redirect URI
var baseURL = 'https://api.spotify.com/v1'; // Base URL for Spotify API
var userId = '';
var sdk = SpotifyApi.withClientCredentials("".concat(clientId), "".concat(accessToken), ["playlist-read-private", "playlist-modify-public", "playlist-read-collaborative"]);
// Implementing the Authorization Code Flow with PKCE
var SpotifyAuth = {
    //Using the Authorization Code Flow with PKCE
    generateRandomString: function (length) {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var values = crypto.getRandomValues(new Uint8Array(length)); // Generate random values
        return values.reduce(function (acc, val) { return acc + characters[val % characters.length]; }, ''); // Convert to string
    },
    // Generate a random string for the code challenge
    codeVerifier: function () {
        return this.generateRandomString(128); // Generate a random string for the code verifier
    },
    shashHash: function (plain) { return __awaiter(void 0, void 0, void 0, function () {
        var encoder, data;
        return __generator(this, function (_a) {
            encoder = new TextEncoder();
            data = encoder.encode(plain);
            return [2 /*return*/, window.crypto.subtle.digest('SHA-256', data)]; // Hash the data using SHA-256
        });
    }); },
    base64encode: function (input) {
        return btoa(String.fromCharCode.apply(String, Array.from(new Uint8Array(input)))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'); // Convert ArrayBuffer to base64 string
    }
};
var Spotify = {
    //Implementing the Authorization Code Flow with PKCE
    generateCodeChallenge: function () { return __awaiter(void 0, void 0, void 0, function () {
        var codeVerifier, hashed, codeChallenge;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    codeVerifier = SpotifyAuth.codeVerifier();
                    return [4 /*yield*/, SpotifyAuth.shashHash(codeVerifier)];
                case 1:
                    hashed = _a.sent();
                    codeChallenge = SpotifyAuth.base64encode(hashed);
                    return [2 /*return*/, { codeVerifier: codeVerifier, codeChallenge: codeChallenge }]; // Return both code verifier and challenge
            }
        });
    }); },
    authorizeUser: function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, codeVerifier, codeChallenge, scopes, authorizationUrl;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Spotify.generateCodeChallenge()];
                case 1:
                    _a = _b.sent(), codeVerifier = _a.codeVerifier, codeChallenge = _a.codeChallenge;
                    localStorage.setItem('code_verifier', codeVerifier);
                    scopes = 'playlist-modify-public';
                    authorizationUrl = "https://accounts.spotify.com/authorize?client_id=".concat(clientId, "&response_type=code&redirect_uri=").concat(encodeURIComponent(redirectUri), "&scope=").concat(encodeURIComponent(scopes), "&code_challenge_method=S256&code_challenge=").concat(codeChallenge);
                    window.location.href = authorizationUrl; // Redirect the user to the authorization URL
                    return [2 /*return*/];
            }
        });
    }); },
    exchangeAuthorizationCode: function (code, codeVerifier) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenUrl, body, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenUrl = 'https://accounts.spotify.com/api/token';
                        body = new URLSearchParams({
                            grant_type: 'authorization_code',
                            code: code,
                            redirect_uri: redirectUri,
                            client_id: clientId,
                            code_verifier: codeVerifier,
                        });
                        return [4 /*yield*/, fetch(tokenUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: body.toString(), // Send the request body as URL-encoded string
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to exchange authorization code for access token'); // Handle error
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log('Token Response:', data); // Log the token response
                        return [2 /*return*/, { access_token: data.access_token }]; // Return the access token data
                }
            });
        });
    },
    getAccessToken: function () {
        if (accessToken) {
            return accessToken;
        }
        var accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        var expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            var expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(function () { return (accessToken = ''); }, expiresIn * 1000);
            window.history.pushState('Access Token', '', '/'); // Fixed null to empty string
            return accessToken;
        }
        return null;
    },
    search: function (term) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, response, jsonResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accessToken = Spotify.getAccessToken();
                        if (!accessToken)
                            return [2 /*return*/, []];
                        localStorage.setItem('userInput', term); // Store the search term in local storage
                        return [4 /*yield*/, fetch("".concat(baseURL, "/search?type=track&q=").concat(term), {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: "Bearer ".concat(accessToken),
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            /* accessToken; // Refresh the token if needed */
                            console.error('Error fetching search results:', response.statusText);
                            return [2 /*return*/, []]; // Return an empty array on error
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        jsonResponse = _a.sent();
                        if (!jsonResponse.tracks) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, jsonResponse.tracks.items.map(function (track) { return ({
                                id: track.id,
                                name: track.name,
                                artist: track.artists[0].name,
                                album: track.album.name,
                                uri: track.uri,
                                imageUrl: track.album.images[0].url, // Assuming you want the first image URL 
                            }); })];
                }
            });
        });
    },
    getCurrentUserId: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var accessToken_1, headers, response, jsonResponse, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 5, , 6]);
                                    if (!!userId) return [3 /*break*/, 3];
                                    accessToken_1 = Spotify.getAccessToken();
                                    if (!accessToken_1) {
                                        resolve('please sign into Spotify'); // Resolve with a message if no access token
                                        return [2 /*return*/];
                                    }
                                    headers = {
                                        Authorization: "Bearer ".concat(accessToken_1),
                                        'Content-Type': 'application/json',
                                    };
                                    return [4 /*yield*/, fetch('https://api.spotify.com/v1/me', { headers: headers })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) {
                                        reject('Failed to fetch user ID'); // Reject the promise if the request fails
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    jsonResponse = _a.sent();
                                    userId = jsonResponse.id; // Assign to the global userId variable
                                    resolve(userId); // Resolve the promise with the userId
                                    return [3 /*break*/, 4];
                                case 3:
                                    resolve(userId); // Resolve with the existing userId
                                    _a.label = 4;
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    error_1 = _a.sent();
                                    console.error('Error fetching user ID:', error_1);
                                    reject('Error fetching user ID'); // Reject the promise in case of an error
                                    return [3 /*break*/, 6];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    },
    savePlaylist: function (name, trackUris, id) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, headers, response, jsonResponse, userId, playlistResponse, playlistJson, playlistId, playlistResponse_1, playlistJson_1, newPlaylistId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!name || !trackUris.length) {
                            return [2 /*return*/];
                        }
                        accessToken = Spotify.getAccessToken();
                        if (!accessToken)
                            return [2 /*return*/];
                        headers = { Authorization: "Bearer ".concat(accessToken),
                            'Content-Type': 'application/json' };
                        return [4 /*yield*/, fetch('https://api.spotify.com/v1/me', { headers: headers })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        jsonResponse = _a.sent();
                        userId = jsonResponse.id;
                        return [4 /*yield*/, fetch("https://api.spotify.com/v1/users/".concat(userId, "/playlists"), {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({ name: name, description: 'Added from the API' }),
                            })];
                    case 3:
                        playlistResponse = _a.sent();
                        return [4 /*yield*/, playlistResponse.json()];
                    case 4:
                        playlistJson = _a.sent();
                        playlistId = playlistJson.id;
                        return [4 /*yield*/, fetch("https://api.spotify.com/v1/users/".concat(userId, "/playlists/").concat(playlistId, "/tracks"), {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({ uris: trackUris }),
                            })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 14, , 15]);
                        if (!id) return [3 /*break*/, 9];
                        // Update existing playlist
                        return [4 /*yield*/, fetch("https://api.spotify.com/v1/playlists/".concat(id), {
                                headers: headers,
                                method: "PUT",
                                body: JSON.stringify({ name: name }),
                            })];
                    case 7:
                        // Update existing playlist
                        _a.sent();
                        // Add tracks to the existing playlist
                        return [4 /*yield*/, fetch("https://api.spotify.com/v1/playlists/".concat(id, "/tracks"), {
                                headers: headers,
                                method: "PUT",
                                body: JSON.stringify({ uris: trackUris }),
                            })];
                    case 8:
                        // Add tracks to the existing playlist
                        _a.sent();
                        return [3 /*break*/, 13];
                    case 9: return [4 /*yield*/, fetch("https://api.spotify.com/v1/users/".concat(userId, "/playlists"), {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ name: name, description: 'Added from the API' }),
                        })];
                    case 10:
                        playlistResponse_1 = _a.sent();
                        return [4 /*yield*/, playlistResponse_1.json()];
                    case 11:
                        playlistJson_1 = _a.sent();
                        newPlaylistId = playlistJson_1.id;
                        return [4 /*yield*/, fetch("https://api.spotify.com/v1/playlists/".concat(newPlaylistId, "/tracks"), {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({ uris: trackUris }),
                            })];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_2 = _a.sent();
                        console.log("playlist could not be updated");
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    },
    getUserPlaylists: function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId_1, accessToken_2, headers, playlistUser, jsonResponse, playlists, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getCurrentUserId()];
                    case 1:
                        userId_1 = _a.sent();
                        accessToken_2 = Spotify.getAccessToken();
                        if (!accessToken_2) {
                            console.log('Access token is missing. Please sign into Spotify.');
                            return [2 /*return*/, []];
                        }
                        ;
                        headers = { Authorization: "Bearer ".concat(accessToken_2),
                            'Content-Type': 'application/json' };
                        return [4 /*yield*/, fetch("https://api.spotify.com/v1/users/".concat(userId_1, "/playlists"), {
                                headers: headers,
                                method: 'GET',
                            })];
                    case 2:
                        playlistUser = _a.sent();
                        if (!playlistUser.ok) {
                            console.error('Failed to fetch playlists:', playlistUser.statusText);
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, playlistUser.json()];
                    case 3:
                        jsonResponse = _a.sent();
                        playlists = jsonResponse.items.map(function (playlist) { return ({
                            id: playlist.id,
                            name: playlist.name,
                        }); });
                        return [2 /*return*/, playlists];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    getPlaylistId: function (playlist_Id) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken_3, headers, response, jsonResponse, tracks, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        accessToken_3 = Spotify.getAccessToken();
                        if (!accessToken_3)
                            return [2 /*return*/, []];
                        headers = {
                            Authorization: "Bearer ".concat(accessToken_3), 'Content-Type': 'application/json'
                        };
                        return [4 /*yield*/, fetch("https://api.spotify.com/v1/playlists/".concat(playlist_Id, "/tracks"), {
                                headers: headers,
                                method: 'GET',
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            console.error('Failed to fetch playlist tracks:', response.statusText);
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        jsonResponse = _a.sent();
                        tracks = jsonResponse.items.map(function (item) { return ({
                            id: item.track.id,
                            name: item.track.name,
                            artist: item.track.artists[0].name,
                            album: item.track.album.name,
                            uri: item.track.uri,
                        }); });
                        return [2 /*return*/, tracks];
                    case 3:
                        error_4 = _a.sent();
                        console.log('Error fetching playlist tracks:', error_4);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    clearAccessToken: function () {
        accessToken = '';
    },
    setAccessToken: function (token) {
        accessToken = token;
    },
};
export default Spotify;
