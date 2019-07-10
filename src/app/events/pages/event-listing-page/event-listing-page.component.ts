import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'ng-animate';
import { EventModel } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-event-listing-page',
  templateUrl: './event-listing-page.component.html',
  styleUrls: ['./event-listing-page.component.sass'],
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 1, delay: 0 },
        }),
      ),
    ]),
  ],
})
export class EventListingPageComponent implements OnInit {
  events: EventModel[];

  public isLoading = true;

  constructor(private eventService: EventService) {
    this.eventService = eventService;
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe((events: Array<EventModel>) => {
      this.events = events;
      this.isLoading = false;
    });
  }
}
