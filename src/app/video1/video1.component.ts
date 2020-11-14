import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BuilderService } from '../services/builder.service';

declare var MediaRecorder: any;
@Component({
  selector: 'app-video1',
  templateUrl: './video1.component.html',
  styleUrls: ['./video1.component.css']
})
export class Video1Component implements OnInit {

 // Object permettant de recuperer le flux vidéo
 mediaRecorder;

 // flux d'enrégistrement
 recordedBlobs;

 // element affichant les messages d'erreurs
 errorMsgElement;

 // ancre de la balise video d'enregistrement direct
 recordedVideo;

 // ancre du bouton [enrégistrer]
 recordButton;

 // ancre du bouton [jouer] la vidéo enregistrée
 playButton;

 // ancre du bouton telecharger la vidéo enrégistrer
 downloadButton;

 // parametrage de l'enrégistrement
 // capturer le son, la video, definir la taille de l'affichage vidéo etc.
 constraints;


 // annulation de l'echo sinon on percoit le bruit de fond pendant l'enrégistrement
 hasEchoCancellation;

 // stream
  streamFlux;
private trigger: Subject<void> = new Subject<void>();

constructor(private builderService: BuilderService) { }

  ngOnInit(): void {
    this.initialize();

  }


  handleSuccess(stream): void {
    this.recordButton.disabled = false;
    console.log('getUserMedia() got stream:', stream);
    (window as any).stream = stream;

    const gumVideo = document.querySelector('video#gum');
    (gumVideo as any).srcObject = stream;
  }

  /**
   * initialiser tous les éléments
   */
  initialize(): void{
// initialisation des éléments
    this.errorMsgElement = document.querySelector('span#errorMsg');
    this.recordedVideo = document.querySelector('video#recorded');
    this.recordButton = document.querySelector('button#record');
    this.playButton = document.querySelector('button#play');
    this.downloadButton = document.querySelector('button#download');
    this.constraints = {
      audio: {
        echoCancellation: {exact: 'hasEchoCancellation'}
      },
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
        facingMode: 'user'
      }
    };
    console.log('Using media constraints:', this.constraints);
  }


  startCamera(): void {
    this.hasEchoCancellation = ((document.querySelector('#echoCancellation')) as any).checked;
    const promise = navigator.mediaDevices.getUserMedia(this.constraints)
     .then(
      (stream)  =>  {
        this.handleSuccess(stream);
        this.streamFlux = stream;
      }
    ).catch(
      (e) => {
        console.error('navigator.getUserMedia error:', e);
        this.errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
      }
    );
  }


  playProcess($event): void {
    const superBuffer = new Blob(this.recordedBlobs, {type: 'video/webm'});
    this.recordedVideo.src = null;
    this.recordedVideo.srcObject = null;
    this.recordedVideo.src = window.URL.createObjectURL(superBuffer);
    this.recordedVideo.controls = true;
    this.recordedVideo.play();
  }

  /**
   * @Comment demarrer le processus d'enrégistrement
   * @param event evenement declencheur
   */
  startDownloadProcess(event): void {
    const blob = new Blob(this.recordedBlobs, {type: 'video/mp4'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.mp4';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  /**
   * @Comment Debuter l'enrégistrement
   */
  startRecordProcess(event): void {
    const mediaRecorder = new MediaRecorder(this.streamFlux);

    // on debute l'enrégistrement si il est à l'arrêt sinon on y met fin
    if (this.recordButton.textContent === 'Record') {
      this.startRecording(this.streamFlux);
      /* mediaRecorder.ondataavailable = (ev)  =>  {
        chunks.push(ev.data);
      } */
    } else {
      this.stopRecording();
    }
  }
  /**
   * @Comment arreter l'enrégistrement
   */
  stopRecording(): void {
    this.mediaRecorder.stop();
    this.recordButton.textContent = 'Record';
    this.playButton.disabled = false;
    this.downloadButton.disabled = false;
  }

  /**
   * @Comment débuter le processus d'enrégistrement
   */
  startRecording(ev): void {
    // on vide le contenu précédemment enrégistré
    this.recordedBlobs = [];
    // definition de l'extension de la vidéo
    const options = {mimeType: 'video/webm;codecs=vp9,opus'};
    try {
      this.mediaRecorder = new MediaRecorder(this.streamFlux, options);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      this.errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
      return;
    }

    console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);
    this.recordButton.textContent = 'Stop Recording';
    this.playButton.disabled = true;
    this.downloadButton.disabled = true;
    this.mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event);
      console.log('Recorded Blobs: ', this.recordedBlobs);
    };
    this.mediaRecorder.start();
    this.mediaRecorder.ondataavailable = this.handleDataAvailable(ev);
    console.log('MediaRecorder started', this.mediaRecorder);
  }

  /**
   * @Comment on recupere le flux dès que il est disponible
   */
  handleDataAvailable(event): void {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
      this.recordedBlobs.push(event.data);
    }
  }

}
