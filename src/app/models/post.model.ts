import { LatLngPosition } from './position.model';

export class SubmissionPost {
    constructor(
	public text: string,
	public pictureId: number, // id returned by file upload method in backend
	public location: LatLngPosition,
	public arrivalKey: string
    ) {}
}

export class ViewPost {
    public timestamp: Date;
    
    constructor(
	public text: string,
	public pictureUrl: string,
	public finalDistance: number,
	private _timestamp: number // milliseconds since Unix Epoch
    ) {
	this.timestamp = new Date(_timestamp);
    }
}
