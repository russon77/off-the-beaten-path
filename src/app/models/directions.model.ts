import {LatLngPosition} from './position.model';

export type CompassDirection = 'N' | 'S' | 'E' | 'W' | 'NE' | 'NW' | 'SE' | 'SW';

export class Directions {
    public compass: CompassDirection;
    public distance: number; // meters
    
    constructor(
	public start: LatLngPosition,
	public end: LatLngPosition
    ) {
	this.distance = 15;
	this.compass = Directions.calculateCompassDirection(start, end);
    }

    static calculateCompassDirection(a: LatLngPosition, b: LatLngPosition): CompassDirection {
	return 'N';
    }
}
