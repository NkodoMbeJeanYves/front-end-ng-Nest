import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingleGuestComponent } from './event/components/single-guest/single-guest.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { NewEventComponent } from './event/components/new-event/new-event.component';
import { SampleComponent } from './sample/sample.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedDataService } from './services/shared-data.service';
import { BuilderService } from './services/builder.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { VideoComponent } from './video/video.component';
import { WebcamModule } from 'ngx-webcam';
import { Video2Component } from './video2/video2.component';
import { Video1Component } from './video1/video1.component';
import { NgxPaginationModule } from 'ngx-pagination';

const toastrConfig = {
  timeOut: 3000,
  progressBar: true,
  positionClass: 'toast-up-left',
  titleClass: '',
  messageClass: '',
  enableHtml: true
};



@NgModule({
  declarations: [
    AppComponent,
    SingleGuestComponent,
    EventListComponent,
    NewEventComponent,
    SampleComponent,
    VideoComponent,
    Video2Component,
    Video1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    WebcamModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(toastrConfig),

  ],
  providers: [
    SharedDataService,
    BuilderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
