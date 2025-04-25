import { AuthorizationCodeWithPKCEStrategy, SpotifyApi } from '@spotify/web-api-ts-sdk';

// Choose one of the following:
interface Playlist {
  id: string;
  name: string;
}

interface Track {
  id?: number | string;
  name: string;
  artist: string;
  album: string;
  uri: string;
  imageUrl?: string;
}



// Declare missing variables
let accessToken: string = ''; // Access token for Spotify API
const clientId: string = 'f26484d0771f46d1af9661203413a716'; // Replace with your Spotify client ID
const redirectUri: string = 'http://localhost:5173/'; // Replace with your redirect URI
const baseURL: string = 'https://api.spotify.com/v1'; // Base URL for Spotify API
let userId: string = '';

const sdk = SpotifyApi.withClientCredentials(`${clientId}`,`${accessToken}`, ["playlist-read-private", "playlist-modify-public", "playlist-read-collaborative"]);
const Spotify = {
  getAccessToken(): string | void {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', '', '/'); // Fixed null to empty string
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      (window.location as any) = accessUrl; // Cast to `any` to avoid type error
    }
  },

  async search(term: string): Promise<any[]> {
    const accessToken = Spotify.getAccessToken();
    if (!accessToken) return [];
    localStorage.setItem('userInput', term); // Store the search term in local storage
      const response = await fetch(`${baseURL}/search?type=track&q=${term}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      
      if(!response.ok) {
       /* accessToken; // Refresh the token if needed */
        console.error('Error fetching search results:', response.statusText);
        return []; // Return an empty array on error
      }

    

    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      imageUrl: track.album.images[0].url, // Assuming you want the first image URL 
    }));
    
  },
  
  async getCurrentUserId(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userId) {
          const accessToken = Spotify.getAccessToken();
          if (!accessToken) {
            resolve('please sign into Spotify'); // Resolve with a message if no access token
            return;
          }
  
          const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          };
  
          const response = await fetch('https://api.spotify.com/v1/me', { headers });
          if (!response.ok) {
            reject('Failed to fetch user ID'); // Reject the promise if the request fails
            return;
          }
  
          const jsonResponse = await response.json();
          userId = jsonResponse.id; // Assign to the global userId variable
          resolve(userId); // Resolve the promise with the userId
        } else {
          resolve(userId); // Resolve with the existing userId
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        reject('Error fetching user ID'); // Reject the promise in case of an error
      }
    })  
  },

  async savePlaylist(name: string, trackUris: string[], id: string | null): Promise<void> {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    if (!accessToken) return;

    const headers = { Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json' };
    const response = await fetch('https://api.spotify.com/v1/me', { headers });
    const jsonResponse = await response.json();
    const userId: string = jsonResponse.id;

      const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ name , description: 'Added from the API' }),
    });
    const playlistJson = await playlistResponse.json();
    const playlistId: string = playlistJson.id;

    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ uris: trackUris }),
    });

    try{
      if(id)
        {
        // Update existing playlist
    await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers,
      method: "PUT",
      body: JSON.stringify({ name }),
    });

    // Add tracks to the existing playlist
    await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers,
      method: "PUT",
      body: JSON.stringify({ uris: trackUris }),
    });

      } else {
        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers,
          method: 'POST',
          body: JSON.stringify({ name , description: 'Added from the API' }),
        });
        const playlistJson = await playlistResponse.json();
        const newPlaylistId: string = playlistJson.id;
    
        await fetch(`https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`, {
          headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris }),
        });
      }
    }catch(error){
      console.log(`playlist could not be updated`)
    }
  },

  async getUserPlaylists(): Promise<Playlist[]> {
    try{
      const userId = await this.getCurrentUserId();
      const accessToken = Spotify.getAccessToken();
    if (!accessToken) {
      console.log('Access token is missing. Please sign into Spotify.');
      return [];
    };
    //Setting up headers for request
    const headers = { Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json' };
    
      const playlistUser = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers,
        method: 'GET',
      });
      if (!playlistUser.ok){
        console.error('Failed to fetch playlists:', playlistUser.statusText);
        return [];
      }
      const jsonResponse = await playlistUser.json();
      const playlists: Playlist[] = jsonResponse.items.map((playlist: any) => ({
        id: playlist.id,
      name: playlist.name,
      }));

      return playlists;
  } catch (error) {
    console.log(error)
    return [];
  }
},

async getPlaylistId(playlist_Id: string): Promise<Track[]> {
  try{
    const accessToken = Spotify.getAccessToken();
    if(!accessToken) return [];
    
    const headers= {
      Authorization: `Bearer ${accessToken}`, 'Content-Type':'application/json'
    };

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_Id}/tracks`,
      {
        headers,
        method: 'GET',
      }
    );
    if (!response.ok) {
      console.error('Failed to fetch playlist tracks:', response.statusText);
      return [];
    }

    const jsonResponse = await response.json();

    const tracks = jsonResponse.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists[0].name,
      album: item.track.album.name,
      uri: item.track.uri,
    }));

    return tracks;
  } catch (error){
    console.log('Error fetching playlist tracks:', error)
    return [];
  }
}

}

export default Spotify;