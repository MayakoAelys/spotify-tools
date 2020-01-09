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

    constructor(apiItem?: string)
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
    }
}
