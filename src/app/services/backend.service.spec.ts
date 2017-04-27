import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { BackendService } from './backend.service';

describe('BackendService', () => {
    beforeEach(() => {
	TestBed.configureTestingModule({
	    providers: [
		{
		    provide: XHRBackend,
		    useClass: MockBackend
		},
		BackendService
	    ],
	    imports: [
		HttpModule
	    ]
	});
    });

    it('should ...', inject([BackendService], (service: BackendService) => {
	expect(service).toBeTruthy();
    }));
});
