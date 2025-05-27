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
export declare const clientId: string;
export declare const redirectUri: string;
declare const Spotify: {
    generateCodeChallenge: () => Promise<{
        codeVerifier: string;
        codeChallenge: string;
    }>;
    authorizeUser: () => Promise<void>;
    exchangeAuthorizationCode(code: string, codeVerifier: string): Promise<{
        access_token: string;
    }>;
    getAccessToken(): string | null;
    search(term: string): Promise<any[]>;
    getCurrentUserId(): Promise<string>;
    savePlaylist(name: string, trackUris: string[], id: string | null): Promise<void>;
    getUserPlaylists(): Promise<Playlist[]>;
    getPlaylistId(playlist_Id: string): Promise<Track[]>;
    clearAccessToken(): void;
    setAccessToken(token: string): void;
};
export default Spotify;
