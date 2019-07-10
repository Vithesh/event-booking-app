import { Deserializable } from '../../shared/interfaces/deserializable.interface';

export class EventAttendeeModel implements Deserializable {
  name: string;

  constructor(attendee: any = {}) {
    this.name = attendee.name;
  }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
