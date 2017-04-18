import { Component, OnInit, EventEmitter, Inject, NgZone } from '@angular/core';
import { NgUploaderOptions, UploadedFile } from 'ngx-uploader';

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

    constructor(@Inject(NgZone) private zone: NgZone) {
	this.options = new NgUploaderOptions({
	    url: 'http://api.ngx-uploader.com/upload',
	    filterExtensions: true,
	    allowedExtensions: ['jpg', 'png'],
	    data: { userId: 12 },
	    autoUpload: false,
	    fieldName: 'file',
	    fieldReset: true,
	    maxUploads: 2,
	    method: 'POST',
	    previewUrl: true,
	    withCredentials: false
	});

	this.inputUploadEvents = new EventEmitter<string>();
    }

    ngOnInit() {}

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
