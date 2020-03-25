export class TrackToRemove
{
    public ID: string;
    public URI: string;
    public Positions: number[] = [];

    constructor(ID?: string, URI?: string, positions?: number[])
    {
        this.ID = ID;
        this.URI = URI;

        if (!positions)
            this.Positions = [];
        else
            this.Positions = positions;
    }
}
