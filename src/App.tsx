import { useState, useCallback, useEffect } from "react";
import SearchBar from "./SearchBarComponents/searchBar";
import SearchResults from "./SearchresultsComponent/SearchResults";
import PlaylistComponents from "./PlayListComponents/PlaylistComponents";
import TrackDisplay from "./TrackDisplayComponent/TrackDisplay";
import Spotify from "./SpotifyComponent/script";
import "./App.css";
import { clientId, redirectUri } from "./SpotifyComponent/script";
import PlaylistListItems, {
  Playlist,
} from "./playlistItemsComponent/playlistListItems";

interface Track {
  id?: number | string | undefined;
  name: string;
  artist: string;
  album: string;
  uri: string;
  imageUrl?: string;
}

/*let nextId = 0; */

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<Track[]>([]);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [playList, setPlaylist] = useState<Track[]>([]);

  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [playlistName, setPlaylistName] = useState<string>("New Playlist");
  const [playlistId, setPlaylistId] = useState<number | string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    const scopes = "playlist-modify-public";
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectUri}`;
    window.location.href = accessUrl;
  };
  useEffect(() => {
    try {
      const hash = window.location.hash;
      if (hash) {
        const tokenMatch = hash.match(/access_token=([^&]*)/);
        if (tokenMatch) {
          const token = tokenMatch[1];
          Spotify.setAccessToken(token);
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
          window.history.pushState(
            "",
            document.title,
            window.location.pathname
          );
        }
      }
    } catch (error) {
      console.error("Error checking access token:", error);
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    Spotify.clearAccessToken();
    setPlaylist([]);
    setSearchTerm([]);
  };

  const search = useCallback(
    (term: string) => {
      if (!isLoggedIn) {
        alert("Please log in to Spotify first.");
        return;
      }
      const token = Spotify.getAccessToken();
      if (!token) {
        alert("Please log in to Spotify first.");
        return;
      }

      Spotify.search(term).then(setSearchTerm);
    },
    [isLoggedIn]
  );

  useEffect(() => {
    const storedTerm = localStorage.getItem("userInput");
    if (storedTerm) {
      Spotify.search(storedTerm).then(setSearchTerm);
      localStorage.removeItem("userInput");
    }
  }, []);

  const addToTrack = useCallback(
    (track: Track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
        setPlaylistTracks((prevTracks) => [...prevTracks, track]);
        return;
      }
    },
    [playlistTracks]
  );
  const toggleSectionVisibility = () => {
    setIsSectionVisible((prevState) => !prevState); // Toggle visibility
  };

  const selectPlaylist = async (id: number | string) => {
    try {
      const playlistId = String(id);
      const tracks = await Spotify.getPlaylistId(playlistId);
      setPlaylistTracks(tracks);
      setPlaylistId(id);

      const selectedPlaylist = playList.find((playList) => playList.id === id);
      if (selectedPlaylist) {
        setPlaylistName(selectedPlaylist.name);
      }
    } catch (error) {
      console.log("Error selecting playlist:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search term submitted: ", searchTerm);
    if (searchTerm.length > 0) {
      console.log("first search term: ", searchTerm[0]);
    }
  };

  const matchingTrack = searchTerm.filter(
    (track) =>
      searchTerm[0]?.name &&
      track.name.toLowerCase().includes(searchTerm[0].name.toLowerCase()) // Assuming you want the first matching track
  );

  const savePlaylist = useCallback(async () => {
    const trackUris = playList.map((track) => track.uri);
    const playListId = String(playlistId);
    await Spotify.savePlaylist(playlistName, trackUris, playListId).then(() => {
      setPlaylistName(playlistName);
      setPlaylistTracks([]);
      setPlaylistId(null);
    });
  }, [playlistName, playlistTracks, playlistId]);

  const handlePlayListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  const resultsDisplayButtonHandler = (track: Track) => {
    if (!playList.some((addedTrack) => addedTrack.id === track.id)) {
      setPlaylist([
        ...playList,
        {
          id: track.id,
          name: track.name,
          artist: track.artist,
          album: track.album,
          uri: track.uri,
        },
      ]);
      setIsSectionVisible(true);
    } else {
      return alert("Track exists in Playlist Already");
    }
  };

  return (
    <div className="App-display">
      <div className="searchBarSection">
        <SearchBar handleSubmit={handleSubmit} onSearch={search} />
      </div>
      <div className="loginSection">
        {!isLoggedIn ? (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleLogin}
          >
            Login to Spotify
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      <div className="searchResultsSection">
        <SearchResults
          searchTerm={searchTerm[0]?.name}
          tracks={playList}
          onAdd={addToTrack}
        />
      </div>
      <hr />
      <div className="searchResults-display bg-light d-flex justify-content-start">
        <ul className="list-group list-group-flush">
          {searchTerm.slice().map((track) => (
            <li
              id="songDisplays"
              className="list-group-item listModifications"
              key={track.id}
            >
              <strong>{track.name}</strong> by <em>{track.artist}</em> (Album:{" "}
              {track.album})
              <button
                className="btn btn-outline-success btn-sm"
                type="button"
                onClick={() => resultsDisplayButtonHandler(track)}
              >
                +
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="d-flex flex-row-reverse">
        <section className="playlistSection">
          <PlaylistComponents
            name={playlistName}
            onChange={handlePlayListNameChange}
          />
          {isSectionVisible ? (
            <div className="playlist-Display">
              <ul className="list-group list-group-vertical">
                {playList.map((track) => (
                  <li
                    className="list-group-item bg-success text-light"
                    key={track.id}
                  >
                    {track.name} by {track.artist}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() =>
                        setPlaylist(playList.filter((a) => a.id !== track.id))
                      }
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Playlist is empty</p>
          )}
          <button
            type="submit"
            className="btn btn-outline-dark text-light"
            onClick={(event) => {
              event.preventDefault();
              savePlaylist();
            }}
          >
            Add to Spotify Playlist{" "}
          </button>
          <div className="d-flex flex-row-reverse">
            <button
              type="button"
              onClick={toggleSectionVisibility}
              className="btn btn-warning"
            >
              {isSectionVisible ? "Hide Playlist" : "Show Playlist"}
            </button>
          </div>
        </section>
      </div>
      <div className="userLocalPlaylistDisplay">
        {!isLoggedIn ? (
          <p>Please log in to view your playlists.</p>
        ) : (
          <PlaylistListItems selectPlaylist={selectPlaylist} />
        )}
      </div>
      <div className="trackDisplayDiv">
        {matchingTrack ? (
          <div className="trackDisplaySection d-flex justify-content-center">
            <img
              src={searchTerm[0]?.imageUrl || ""}
              alt={searchTerm[0]?.name || "Track Image"}
              className="imageDisplay"
            />
            <TrackDisplay
              name={searchTerm[0]?.name || ""}
              artist={searchTerm[0]?.artist || ""}
              album={searchTerm[0]?.album || ""}
            />
          </div>
        ) : (
          <p>No matching track found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
