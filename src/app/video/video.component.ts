import { HttpClient, HttpEventType } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
chunks = [];

isFormCompleted = false;

// upload component
progress: number ;
inProgress = false;

filename = 'filename will be showed here';
  constructor(
    private http: HttpClient,
    private builderSvc: BuilderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadState();
    this.title = undefined;
    this.description = undefined;
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
        // let chunks = [];
        start.addEventListener('click', (ev) => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
        });

        stop.addEventListener('click', (ev) => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
        });

        mediaRecorder.ondataavailable = (ev)  =>  {
          this.chunks.push(ev.data);
        }

        /* mediaRecorder.onstop = (ev) =>  {
          let blob = new Blob(chunks, { type: 'video/mp4;'});
          this.file = blob as any;
          chunks = [];
          let videoURL = window.URL.createObjectURL(blob);
          (vidSave as any).src = videoURL;
          console.log(blob);
          const fd = new FormData();
          fd.append('file', this.file);
          this.http.post('http://localhost:3000/api/videos/upload', fd, { headers : this.builderSvc.options}).subscribe(
            (data)  =>  {
              console.log(data);
            }
          );
        } */

        mediaRecorder.onstop = (ev) =>  {
          let blob = new Blob(this.chunks, { type: 'video/mp4;'});
          this.file = blob as any;
          // after recording we upload already 
          console.log(this.title, this.description);
          if (this.title !== undefined && this.description !== undefined ) {
            this.upload().subscribe(
              (Data) => {
                const data = Data as any;
                console.log(data.file.filename);
                this.filename = data.file.filename;
                this.video.video_file_location = data.file.path;
                this.saveVideoInformation();
              },
              (err) =>  {
                console.log(err);
              }
            );
          } else {
            this.toastr.info('le formulaire doit être completé avant la soumission!');
          }
          this.chunks = [];
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

  upload() {
    const fd = new FormData();
    fd.append('file', this.file);  // definition du champ name='photo' dont la valeur est le fichier à uploader
    return this.http.post('http://localhost:3000/api/videos/upload', fd);
  }


  fakeUpload(ev): void {
    console.log('No needed!');
  }


  saveVideoInformation(): void {
    let ControlFlag = false; // variable de controle des validation
    this.video.video_title = this.title;
    this.video.video_description = this.description;
    this.video.video_file_location = 'No Yet Defined';

    let control = new FormControl(this.title, [Validators.minLength(5), Validators.required]);
    if (control.errors) {
      ControlFlag = true;
    }

    control = new FormControl(this.description, [Validators.minLength(5), Validators.required]);
    if (control.errors) {
      ControlFlag = true;
    }

    if (ControlFlag === true) {
      // message d'erreur
      this.toastr.error('Le formulaire doit totalement etre renseigné');
    } else {
      const fd = new FormData();
      fd.append('file', this.file);
      this.http.post('http://localhost:3000/api/videos', this.video, { headers : this.builderSvc.options}).subscribe(
        (data) => {
          console.log(data);
          this.toastr.success('informations saved!');
        }
      );
    }

  }
  


  }