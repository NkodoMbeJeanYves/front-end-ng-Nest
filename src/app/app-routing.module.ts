import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './event/components/new-event/new-event.component';
import { SingleGuestComponent } from './event/components/single-guest/single-guest.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { SampleComponent } from './sample/sample.component';
import { VideoComponent } from './video/video.component';
import { Video1Component } from './video1/video1.component';
import { Video2Component } from './video2/video2.component';


const routes: Routes = [
  {path: 'new-event', component: NewEventComponent},
  {path: 'video', component: VideoComponent},
  {path: 'video2', component: Video2Component},
  {path: 'video1', component: Video1Component},
  {path: '', component: EventListComponent},
  {path: 'sample', component: SampleComponent},
  { path: '**', redirectTo: '/events', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
