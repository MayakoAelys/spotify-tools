export enum TokenStatus
{
    /** Token not found in the local storage */
    EMPTY = 'EMPTY',
    /** Token has expired */
    EXPIRED = 'EXPIRED',
    /** Token has been tested and is valid */
    VALID = 'VALID'
}
