import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.sass'],
})
export class EventSearchComponent {
  @Input() searchModel: string;
  @Output() searchModelChange = new EventEmitter();

  change(newValue) {
    this.searchModel = newValue;
    this.searchModelChange.emit(newValue);
  }
}
