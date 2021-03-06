// https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
export class UserProfile
{
    ID: string;
    DisplayName: string;
    AvatarURL: string;
    ProfileURL: string;

    constructor(apiResult?: object)
    {
        if (!apiResult) { return; }

        this.ID          = apiResult['id'];
        this.DisplayName = apiResult['display_name'];
        this.AvatarURL   = apiResult['images'][0]['url'];
        this.ProfileURL  = apiResult['external_urls']['spotify'];
    }
}
