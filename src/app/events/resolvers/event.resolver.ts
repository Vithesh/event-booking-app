import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EventModel } from '../models/event.model';
import { Observable } from 'rxjs';
import { EventService } from '../services/event.service';

@Injectable()
export class EventResolver implements Resolve<Observable<EventModel>> {
  constructor(private eventService: EventService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.eventService.getEvent(route.paramMap.get('id'));
  }
}
