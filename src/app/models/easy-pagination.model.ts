export class EasyPagination <T> {
    constructor(
	public data: T[],
	lastPage: boolean
    ) {}
}
