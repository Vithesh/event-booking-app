import { Pipe, PipeTransform } from '@angular/core';
import { EventModel } from '../models/event.model';

@Pipe({
  name: 'eventSearchFilter',
})

export class EventSearchFilterPipe implements PipeTransform {
  transform(items: EventModel[], searchText: string): EventModel[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((item: EventModel) => {
      return item.name ? item.name.toLowerCase().includes(searchText) : false;
    });
  }
}
