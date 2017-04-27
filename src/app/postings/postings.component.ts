import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MdDialog } from '@angular/material';

import 'rxjs/add/operator/zip';

import { BackendService } from '../services/backend.service';

import { ViewPost } from '../models/post.model';
import { EasyPagination } from '../models/easy-pagination.model';
import { TargetLocation } from '../models/target.model';

import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
    selector: 'app-postings',
    templateUrl: './postings.component.html',
    styleUrls: ['./postings.component.css', '../common.css']
})
export class PostingsComponent implements OnInit {

    public target: TargetLocation;

    public posts: ViewPost[];
    public currentPage: number;
    public moreAvailable = true;
    
    public key: string;

    constructor(private backendService: BackendService,
		private route: ActivatedRoute,
		private dialog: MdDialog) { }

    ngOnInit() {
        this.route
            .params
            .switchMap(
		params => {
                    this.key = params['key'];

                    return this.backendService
			.getPosts(params['key'])
			.zip(
			    this.backendService.getTargetLocationByKey(params['key']),
			    (posts, target) => ({posts, target})
			);
		}
            )
            .subscribe(
		success => {
                    this.posts = success.posts.data;
                    this.currentPage = success.posts.pageNumber;

		    this.moreAvailable = !success.posts.lastPage;

		    this.target = success.target;
		},
		error => {
                    console.log('PostingsComponent', error);
		}
            );
    }

    public onScrolled() {
	if (false === this.moreAvailable) {
	    return;
	}
	
        this.backendService
            .getPosts(
		this.key,
		this.currentPage + 1
            )
            .subscribe(
		success => {
                    this.posts = this.posts.concat(success.data);
                    this.currentPage = success.pageNumber;
		    this.moreAvailable = !success.lastPage;
		},
		error => {
                    console.log('PostingsComponent', error);
		}
            );
    }

    public openShareDialog() {
	this.dialog.open(ShareDialogComponent);
    }

    public openPostDialog(post: ViewPost) {
	const dialogRef = this.dialog.open(ImageViewerComponent);
	dialogRef.componentInstance.post = post;
    }
}

