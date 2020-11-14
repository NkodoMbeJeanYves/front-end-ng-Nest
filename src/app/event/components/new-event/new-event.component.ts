import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from 'src/app/models/event';
import { BuilderService } from 'src/app/services/builder.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  event: Event;
  dataList: Event[] = [];
  constructor(private builderService: BuilderService) { }

  ngOnInit(): void {

    this.event = new Event();
    this.event.status = false;
    // definition de la route vers laquelle redirige apres ajout d'un evenement
    this.builderService.setEndPoint(environment.BASE_URL + '/events');
  }

  addNewEvent(e: NgForm): void {
    console.log(e.value);
  }

  selectSpeaker(speaker_id): void {
    console.log(speaker_id);
  }

  eventOnlineOrNot($event): void {
    console.log($event.checked);
  }

}
