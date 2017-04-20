import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectionsComponent } from './directions/directions.component';
import { PostingsComponent } from './postings/postings.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SettingsAndHelpComponent } from './settings-and-help/settings-and-help.component';

const routes: Routes = [
    {
	path: '',
	component: DirectionsComponent
    },
    {
	path: 'bulletin/:key',
	component: PostingsComponent
    },
    {
	path: 'post/:key',
	component: AddPostComponent
    },
    {
	path: 'help',
	component: SettingsAndHelpComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
