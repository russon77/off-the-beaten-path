import { Component, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-share-dialog',
    templateUrl: './share-dialog.component.html',
    styleUrls: ['./share-dialog.component.css']
})
export class ShareDialogComponent implements OnInit {

    constructor(public dialogRef: MdDialogRef<ShareDialogComponent>) { }

    ngOnInit() {
    }

}
