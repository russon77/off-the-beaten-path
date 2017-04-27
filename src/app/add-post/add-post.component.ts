import { Component, OnInit, EventEmitter, Inject, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';

import { environment } from '../../environments/environment';

import { GeolocationService } from '../services/geolocation.service';
import { BackendService } from '../services/backend.service';

import { SubmissionPost } from '../models/post.model';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css', '../common.css']
})
export class AddPostComponent implements OnInit {

    public options: NgUploaderOptions;
    public sizeLimit = 1000000 * 12; // 12 MB
    public previewData: any;
    public errorMessage: string;
    public response: any;
    public inputUploadEvents: EventEmitter<string>;

    public key: string;

    public postForm: FormGroup;

    public isSubmitting = false;

    constructor( @Inject(NgZone) private zone: NgZone,
		 private route: ActivatedRoute,
		 private locationService: GeolocationService,
		 private backendService: BackendService,
		 private router: Router) {
        this.options = new NgUploaderOptions({
	    url: `${environment.api_url}/image`,
            filterExtensions: true,
            allowedExtensions: ['jpg', 'png'],
            data: {},
            autoUpload: true,
            fieldName: 'image',
            fieldReset: false,
            maxUploads: 1,
            method: 'post',
            previewUrl: true,
            withCredentials: false
        });

        this.inputUploadEvents = new EventEmitter<string>();

        this.postForm = new FormGroup({
            message: new FormControl(null, Validators.required),
            imageId: new FormControl()
        });
    }

    ngOnInit() {
        this.route
            .params
            .switchMap(
		params => {
                    this.key = params['key'];

                    return this.locationService.getCurrentPosition();
		}
            )
            .subscribe(
		success => { },
		error => { }
            );
    }

    startUpload() {
        this.inputUploadEvents.emit('startUpload');
    }

    beforeUpload(uploadingFile: UploadedFile): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            this.errorMessage = 'File is too large!';
        }
    }

    handleUpload(data: any) {
        setTimeout(() => {
            this.zone.run(() => {
                this.response = data;
                if (data && data.response) {
                    this.response = JSON.parse(data.response);
		    this.postForm.patchValue({'imageId': this.response.pictureId});
                }
            });
        });
    }

    handlePreviewData(data: any) {
        this.previewData = data;
    }

    onSubmit() {
	this.isSubmitting = true;

	this.locationService
	    .getCurrentPosition()
	    .switchMap(
		position =>
		    this.backendService.addPost(
			new SubmissionPost(
			    this.postForm.get('message').value,
			    this.postForm.get('imageId').value,
			    position,
			    this.key
			)
		    )
	    )
	    .subscribe(
		success => {
		    this.router.navigate(['/bulletin', this.key]);
		},
		error => {
		    console.log('AddPostComponent', error);
		    this.isSubmitting = false;
		}
	    );
    }
}
