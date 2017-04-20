import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdToolbarModule,
	 MdButtonModule,
	 MdSlideToggleModule,
	 MdCardModule,
	 MdInputModule,
	 MdListModule,
	 MdIconModule
       } from '@angular/material';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NgUploaderModule } from 'ngx-uploader';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DirectionsComponent } from './directions/directions.component';
import { PostingsComponent } from './postings/postings.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SettingsAndHelpComponent } from './settings-and-help/settings-and-help.component';

import { BackendService } from './services/backend.service';
import { GeolocationService} from './services/geolocation.service';
import { GameService } from './services/game.service';

@NgModule({
    declarations: [
	AppComponent,
	HeaderComponent,
	DirectionsComponent,
	PostingsComponent,
	AddPostComponent,
	SettingsAndHelpComponent
    ],
    imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	BrowserAnimationsModule,

	AppRoutingModule,

	MdToolbarModule,
	MdButtonModule,
	MdSlideToggleModule,
	MdCardModule,
	MdInputModule,
	MdListModule,
	MdIconModule,

	InfiniteScrollModule,
	NgUploaderModule
    ],
    providers: [
	GeolocationService,
	BackendService,
	GameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
