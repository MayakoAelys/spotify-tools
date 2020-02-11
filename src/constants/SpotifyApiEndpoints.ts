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
     * POST - https://developer.spotify.com/console/post-playlists/
     * Replace: "{0}" with "user_id"
     */
    public static CreateNewPlaylist: string =
        SpotifyApiEndpoints.BaseURL + 'users/{0}/playlists';
}
