import { useState, useCallback, useEffect } from "react";
import SearchBar from "./SearchBarComponents/searchBar";
import SearchResults from "./SearchresultsComponent/SearchResults";
import PlaylistComponents from "./PlayListComponents/PlaylistComponents";
import TrackDisplay from "./TrackDisplayComponent/TrackDisplay";
import Spotify from "./SpotifyComponent/script";
import "./App.css";

import PlaylistListItem from "./playlistItemsComponent/playlistListItem";
import PlaylistListItems, {
  Playlist,
} from "./playlistItemsComponent/playlistListItems";

interface Track {
  id?: number | string;
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
  const [playlistId, setPlaylistId] = useState<null | string>(null);

  const search = useCallback((term: string) => {
    Spotify.search(term).then(setSearchTerm);
  }, []);

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

  const selectPlaylist = async (id: string) => {
    try {
      const tracks = await Spotify.getPlaylistId(id);
      setPlaylistTracks(tracks);
      setPlaylistId(id);

      const selectedPlaylist = playList.find(
        (playList: Playlist) => playList.id === id
      );
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
    await Spotify.savePlaylist(playlistName, trackUris, playlistId).then(() => {
      setPlaylistName(playlistName);
      setPlaylistTracks([]);
      setPlaylistId(null);
    });
  }, [playlistName, playlistTracks, playlistId]);

  const handlePlayListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  return (
    <div className="App-display">
      <div className="searchBarSection">
        <SearchBar handleSubmit={handleSubmit} onSearch={search} />
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
                onClick={() => {
                  if (
                    !playList.some((addedTrack) => addedTrack.id === track.id)
                  ) {
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
                }}
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
      <div className="userPlaylistDisplay">
        <PlaylistListItems selectPlaylist={selectPlaylist} />
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
