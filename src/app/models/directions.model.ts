export type CompassDirection = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';

export class Directions {
    constructor(
	public compass: CompassDirection,
	public distance: number, // meters,
	public arrivalKey: null | string // when not null, can post to location
    ) {}
}
