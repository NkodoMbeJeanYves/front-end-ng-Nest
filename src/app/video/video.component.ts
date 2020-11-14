import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { BuilderService } from '../services/builder.service';

declare var MediaRecorder: any;
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
deviceId = '';
file: File;

video = {
  video_title : '',
  video_description : '',
  video_file_location : ''

};

title: string;
description: string;
  constructor(
    private http: HttpClient,
    private builderSvc: BuilderService
  ) { }

  ngOnInit(): void {
    this.loadState();
    this.title = 'mon titre';
    this.description = 'ma description';
  }

  loadState(): void {
    if (navigator.mediaDevices === undefined) {
      return;
    }
    const requested = {
      audio: true,
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
        facingMode: 'user'
      }
    };
    var promise = navigator.mediaDevices.getUserMedia(requested).then(
      (mediaStreamObject) =>  {
        let video = document.querySelector('#video');
        // connecter le stream à l'element video
        if ('srcObject' in video) {
          (video as any).srcObject = mediaStreamObject;
        } else {
          // ancien navigateur
          (video as any).src = window.URL.createObjectURL(mediaStreamObject);
        }

        (video as any).onloadedmetadata = (e) => {
          (video as any).play();
        };

        // enregistrer ou arreter la video
        const start = document.getElementById('btnStart');
        const stop = document.querySelector('#btnStop');
        const vidSave = document.querySelector('#vid2');
        const mediaRecorder = new MediaRecorder(mediaStreamObject);
        let chunks = [];
        start.addEventListener('click', (ev) => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
        });

        stop.addEventListener('click', (ev) => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
        });

        mediaRecorder.ondataavailable = (ev)  =>  {
          chunks.push(ev.data);
        }

        mediaRecorder.onstop = (ev) =>  {
          let blob = new Blob(chunks, { type: 'video/mp4;'});
          this.file = blob as any;
          chunks = [];
          let videoURL = window.URL.createObjectURL(blob);
          (vidSave as any).src = videoURL;
          console.log(blob);
        }
      }


    ).catch(
      (err) =>  {
        console.log(err.name + ':' + err.message);
      }
    );
  }


  upload(f: NgForm) {

    const formValues = f.value;
    const title = formValues.title;
    const description = formValues.description;
    console.log(formValues);
    let ControlFlag = false; // variable de controle des validation
    this.video.video_title = title;
    this.video.video_description = description;
    this.video.video_file_location = 'No Yet Defined';

    let control = new FormControl(title, [Validators.minLength(5), Validators.required]);
    if (control.errors) {
      ControlFlag = true;
    }

    control = new FormControl(description, [Validators.minLength(5), Validators.required]);
    if (control.errors) {
      ControlFlag = true;
    }

    if (ControlFlag === true) {
      // message d'erreur
    } else {
    const fd = new FormData();
    fd.append('file', this.file);
    this.http.post('http://localhost:3000/api/videos', this.video, { headers : this.builderSvc.options}).subscribe(
      (data)  =>  {
        console.log('success');
        // upload file
        this.http.post(`http://localhost:3000/api/videos/upload`, fd, { headers : this.builderSvc.options}).subscribe(
      (data)  =>  {
        console.log('file uploaded succefully');
      }
    );

      },
      (err) =>  {
        console.log(err);
      }
    );
    /* return this.http.post(`http://localhost:3000/videos/upload?video_title=${title}&video_description=${description}`, fd).subscribe(
      (data)  =>  {
        console.log('success');
      }
    ); */
    }
  }



}
