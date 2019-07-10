import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { catchError, map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { EndpointsConfig } from '../../config/endpoints.config';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsMap: Map<string, EventModel>;
  private eventsCollection: AngularFirestoreCollection<EventModel>;

  constructor(private afs: AngularFirestore) {
    this.eventsMap = new Map();
    this.eventsCollection = this.afs.collection<EventModel>(EndpointsConfig.EVENTS_COLLECTION);
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      if (error.status >= 500) {
        throw error;
      }

      return of(result);
    };
  }

  getEvents(): Observable<EventModel[]> {
    return this.eventsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const event = new EventModel({ id: action.payload.doc.id, ...data });
          this.eventsMap.set(event.id, event);
          return event;
        });
      }),
      catchError(EventService.handleError('getEvents', [])),
    );
  }

  getEvent(id: string): Observable<any> {
    const event = this.eventsMap.get(id);
    if (event) {
      return of(event);
    }
    return this.afs
      .doc(`${EndpointsConfig.EVENTS_COLLECTION}/${id}`)
      .get()
      .pipe(
        map(evt => {
          return new EventModel({ id, ...evt.data() });
        }),
        catchError(EventService.handleError('getEvent', [])),
      );
  }

  bookEvent(event: EventModel): Promise<void> {
    return this.afs
      .doc(`${EndpointsConfig.EVENTS_COLLECTION}/${event.id}`)
      .update(JSON.parse(JSON.stringify(event)));
  }
}
