import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MdToolbarModule,
    MdButtonModule,
    MdSlideToggleModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdIconModule,
    MdDialogModule
} from '@angular/material';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { NgUploaderModule } from 'ngx-uploader';

import { ShareButtonsModule } from 'ng2-sharebuttons';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DirectionsComponent } from './directions/directions.component';
import { PostingsComponent } from './postings/postings.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SettingsAndHelpComponent } from './settings-and-help/settings-and-help.component';

import { BackendService } from './services/backend.service';
import { GeolocationService } from './services/geolocation.service';
import { GameService } from './services/game.service';
import { SettingsService } from './services/settings.service';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DirectionsComponent,
        PostingsComponent,
        AddPostComponent,
        SettingsAndHelpComponent,
        ShareDialogComponent,
        ImageViewerComponent
    ],
    entryComponents: [
	ShareDialogComponent,
	ImageViewerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,

        ReactiveFormsModule,

        AppRoutingModule,

        MdToolbarModule,
        MdButtonModule,
        MdSlideToggleModule,
        MdCardModule,
        MdInputModule,
        MdListModule,
        MdIconModule,
	MdDialogModule,

        InfiniteScrollModule,
        NgUploaderModule,
	ShareButtonsModule.forRoot()
    ],
    providers: [
        GeolocationService,
        BackendService,
        GameService,
	SettingsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
