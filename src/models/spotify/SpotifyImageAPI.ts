export class SpotifyImageAPI
{
    Height: number;
    Width: number;
    URL: string;

    constructor(apiValue: any)
    {
        this.Height = apiValue['height'];
        this.Width  = apiValue['width'];
        this.URL    = apiValue['url'];
    }
}
