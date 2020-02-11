export class SpotifyApiEndpoints
{
    private static BaseURL: string = 'https://api.spotify.com/v1/';

    /** GET - https://developer.spotify.com/console/get-current-user-playlists/?limit=&offset= */
    public static ListOfCurrentUserPlaylists: string =
        SpotifyApiEndpoints.BaseURL + 'me/playlists?offset=0&limit=50';

    /** GET - https://developer.spotify.com/console/get-current-user/ */
    public static CurrentUserProfile: string =
        SpotifyApiEndpoints.BaseURL + 'me';

    /**
     * GET - https://developer.spotify.com/console/get-playlist-tracks/
     * Replace: "{0}" with "playlist_id"
     */
    public static GetPlaylistTracks: string =
        SpotifyApiEndpoints.BaseURL + 'playlists/{0}/tracks';

    /**
     * POST - https://developer.spotify.com/console/post-playlists/
     * Replace: "{0}" with "user_id"
     */
    public static CreateNewPlaylist: string =
        SpotifyApiEndpoints.BaseURL + 'users/{0}/playlists';

    /**
     * POST - https://developer.spotify.com/console/post-playlist-tracks/
     * Replace: "{0}" with "playlist_id"
     */
    public static AddTracksToPlaylist: string =
        SpotifyApiEndpoints.BaseURL + 'playlists/{0}/tracks';
}
