import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createEvent(): void {
    this.router.navigate(['/new-event']);
  }

}
