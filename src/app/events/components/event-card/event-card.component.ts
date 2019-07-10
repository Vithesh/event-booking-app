import { Component, Input } from '@angular/core';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.sass'],
})
export class EventCardComponent {
  @Input() event: EventModel;
}
