import { LatLngPosition } from './position.model';

export class TargetLocation {
    constructor(public position: LatLngPosition,
		public key: string) // used for submission, unique
    {}
}
