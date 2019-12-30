import { RoutePath } from './../models/RoutePath';

export class RoutesPath
{
    public static readonly Root: RoutePath = { Path: '', TokenRequired: false };
    public static readonly Login: RoutePath = { Path: 'Login', TokenRequired: true };
    public static readonly Index: RoutePath = { Path: 'Index', TokenRequired: true };
    public static readonly FromSpotify: RoutePath = { Path: '#access_token', TokenRequired: false };

    // TODO Pages to create
    public static readonly Authorize: RoutePath = { Path: 'Authorize', TokenRequired: true };
    public static readonly RemoveDuplicate: RoutePath = { Path: 'RemoveDuplicate', TokenRequired: true };
    public static readonly ImportPlaylist: RoutePath = { Path: 'ImportPlaylist', TokenRequired: true };
}
