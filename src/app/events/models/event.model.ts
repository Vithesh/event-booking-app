import { Deserializable } from '../../shared/interfaces/deserializable.interface';
import { EventBookingModel } from './event-booking.model';

export class EventModel implements Deserializable {
  id: string;
  name: string;
  date: Date;
  imageSlug: string;
  totalSeats: number;
  seatsAvailable: number;
  bookings: EventBookingModel[];

  constructor(event: any = {}) {
    this.id = event.id;
    this.name = event.name;
    this.date = new Date(event.date);
    this.imageSlug = event.imageSlug;
    this.totalSeats = event.totalSeats;
    this.bookings = event.bookings ? [...event.bookings] : [];
    this.updateSeatsAvailable();
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  addBooking(booking: EventBookingModel) {
    this.bookings.push(booking);
    this.updateSeatsAvailable();
  }

  private updateSeatsAvailable() {
    this.seatsAvailable = this.totalSeats;
    if (this.bookings && this.bookings.length) {
      this.bookings.forEach(booking => {
        this.seatsAvailable -= 1;
        if (booking.attendees && booking.attendees.length) {
          this.seatsAvailable -= booking.attendees.length;
        }
      });
    }
  }
}
