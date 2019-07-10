import { Component, Input } from '@angular/core';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.sass'],
})
export class EventListComponent {
  @Input() events: EventModel[];
  @Input() searchText: string;
}
