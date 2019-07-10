import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListingPageComponent } from './pages/event-listing-page/event-listing-page.component';
import { EventBookingPageComponent } from './pages/event-booking-page/event-booking-page.component';
import { EventResolver } from './resolvers/event.resolver';

const eventsRoutes: Routes = [
  {
    path: '',
    component: EventListingPageComponent,
  },
  {
    path: ':id',
    component: EventBookingPageComponent,
    resolve: {
      event: EventResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(eventsRoutes)],
  exports: [RouterModule],
  providers: [EventResolver],
})
export class EventsRoutingModule {}
