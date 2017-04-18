import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-postings',
    templateUrl: './postings.component.html',
    styleUrls: ['./postings.component.css', '../common.css']
})
export class PostingsComponent implements OnInit {

    folders = [
	{
	    name: 'Photos',
	    updated: new Date('1/1/16'),
	},
	{
	    name: 'Recipes',
	    updated: new Date('1/17/16'),
	},
	{
	    name: 'Work',
	    updated: new Date('1/28/16'),
	},
	{
	    name: 'Work',
	    updated: new Date('1/28/16'),
	},
	{
	    name: 'Work',
	    updated: new Date('1/28/16'),
	},
	{
	    name: 'Work',
	    updated: new Date('1/28/16'),
	},
	{
	    name: 'Work',
	    updated: new Date('1/28/16'),
	},
	{
	    name: 'Work',
	    updated: new Date('1/28/16'),
	},
    ];

    constructor() { }

    ngOnInit() {
    }

    public onScrolled() {
	console.log('scrolled');
	this.folders = this.folders.concat([...this.folders]);
    }
}
