import { Component, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';

import { ViewPost } from '../models/post.model';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {

    public post: ViewPost;

    constructor(public dialogRef: MdDialogRef<ImageViewerComponent>) { }

    ngOnInit() {
    }

}
