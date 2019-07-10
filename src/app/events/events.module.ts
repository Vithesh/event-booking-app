import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EventSearchFilterPipe } from './pipes/event-search-filter.pipe';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventSearchComponent } from './components/event-search/event-search.component';
import { EventBookingFormComponent } from './components/event-booking-form/event-booking-form.component';
import { EventListingPageComponent } from './pages/event-listing-page/event-listing-page.component';
import { EventBookingPageComponent } from './pages/event-booking-page/event-booking-page.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, SharedModule, EventsRoutingModule],
  declarations: [
    EventSearchFilterPipe,
    EventCardComponent,
    EventListComponent,
    EventSearchComponent,
    EventBookingFormComponent,
    EventListingPageComponent,
    EventBookingPageComponent
  ],
})
export class EventsModule {}
