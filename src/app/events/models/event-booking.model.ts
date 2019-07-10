import { Deserializable } from '../../shared/interfaces/deserializable.interface';
import { EventAttendeeModel } from './event-attendee.model';

export class EventBookingModel implements Deserializable {
  userName: string;
  email: string;
  phone: string;
  attendees: EventAttendeeModel[];

  constructor(eventBooking: any = {}) {
    this.userName = eventBooking.userName;
    this.email = eventBooking.email;
    this.phone = eventBooking.phone;
    this.attendees = eventBooking.attendees ? [...eventBooking.attendees] : [];
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
