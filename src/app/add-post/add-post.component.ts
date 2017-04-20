import { Component, OnInit, EventEmitter, Inject, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';

import { GeolocationService } from '../services/geolocation.service';
import { BackendService } from '../services/backend.service';

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

    constructor( @Inject(NgZone) private zone: NgZone,
        private route: ActivatedRoute,
        private locationService: GeolocationService,
        private backendService: BackendService) {
        this.options = new NgUploaderOptions({
            url: 'https://todo',
            filterExtensions: true,
            allowedExtensions: ['jpg', 'png'],
            data: {},
            autoUpload: false,
            fieldName: 'image',
            fieldReset: false,
            maxUploads: 1,
            method: 'POST',
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
                }
            });
        });
    }

    handlePreviewData(data: any) {
        this.previewData = data;
    }

}
