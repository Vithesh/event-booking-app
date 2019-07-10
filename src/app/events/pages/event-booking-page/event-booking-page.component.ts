import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventModel } from '../../models/event.model';
import { fadeIn } from 'ng-animate';
import { transition, trigger, useAnimation } from '@angular/animations';


@Component({
  selector: 'app-event-booking-page',
  templateUrl: './event-booking-page.component.html',
  styleUrls: ['./event-booking-page.component.sass'],
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
export class EventBookingPageComponent implements OnInit {
  event: EventModel;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.event = this.activatedRoute.snapshot.data.event;
  }
}
