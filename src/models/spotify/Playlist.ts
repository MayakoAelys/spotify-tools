import { SpotifyImageAPI } from './SpotifyImageAPI';
// tslint:disable:no-string-literal
export class Playlist
{
    ID: string;
    URL: string;
    URI: string;
    Description: string;
    Title: string;
    Private: boolean;
    SongsCount: number;
    Owner: string;
    CoverImageURL: string;

    constructor(apiItem?: any)
    {
        if (!apiItem) { return; }

        this.ID  = apiItem['id'];
        this.URL = apiItem['external_urls']['spotify'];
        this.URI = apiItem['uri'];
        this.Description = apiItem['description'];
        this.Title = apiItem['name'];
        this.Private = !apiItem['public'];
        this.SongsCount = apiItem['tracks']['total'];
        this.Owner = apiItem['owner']['display_name'];

        // Try to get 300px cover image
        // cf.: https://developer.spotify.com/documentation/general/guides/working-with-playlists/
        const apiImages = apiItem['images'];

        // console.log('apiImages:', apiImages);

        // TODO: Default playlist cover image?
        if (!apiImages) { this.CoverImageURL = undefined; }
        else
        {
            apiImages.forEach(apiImage => {
                const image = new SpotifyImageAPI(apiImage);

                if (!this.CoverImageURL)
                {
                    this.CoverImageURL = image.URL;
                    return;
                }

                if (image.Height === 300)
                {
                    this.CoverImageURL = image.URL;
                    return;
                }
            });
        }
    }
}
