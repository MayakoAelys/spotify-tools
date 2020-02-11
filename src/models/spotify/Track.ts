// tslint:disable:no-string-literal
export class Track
{
    ID: string;
    URL: string;
    URI: string;
    Title: string;

    constructor(apiResult?: string)
    {
        if (!apiResult) { return; }

        this.ID = apiResult['id'];
        this.URL = apiResult['href'];
        this.URI = apiResult['uri'];
        this.Title = apiResult['name'];
    }
}
