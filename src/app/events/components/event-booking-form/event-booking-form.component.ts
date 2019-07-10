import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Location } from '@angular/common';
import { EventModel } from '../../models/event.model';
import { EventBookingModel } from '../../models/event-booking.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-booking-form',
  templateUrl: './event-booking-form.component.html',
  styleUrls: ['./event-booking-form.component.sass'],
})
export class EventBookingFormComponent implements OnInit {
  @Input() event: EventModel;

  public form: FormGroup;
  public attendeeList: FormArray;
  public isSuccess: boolean;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private eventService: EventService,
  ) {
    this.isSuccess = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]+$'),
        ]),
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      phone: [null, Validators.compose([Validators.pattern(/[1-9]{1}\d{9}/)])],
      seats: [
        null,
        Validators.compose([
          Validators.required,
          this.seatsNotAvailableValidator.bind(this),
        ]),
      ],
      attendees: this.fb.array([this.createAttendee()]),
    });

    this.attendeeList = this.form.get('attendees') as FormArray;
  }

  get attendeeFormGroup() {
    return this.form.get('attendees') as FormArray;
  }

  createAttendee(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required])],
    });
  }

  updateAttendees() {
    let seats = parseInt(this.form.value.seats, 10) - 1;
    const attendees = this.attendeeList.length;
    if (seats > attendees) {
      while (seats > attendees) {
        seats--;
        this.attendeeList.push(this.createAttendee());
      }
    } else if (seats < attendees) {
      while (seats < attendees) {
        seats++;
        this.attendeeList.removeAt(this.attendeeList.length - 1);
      }
    }
  }

  getAttendeesFormGroup(index): FormGroup {
    return this.attendeeList.controls[index] as FormGroup;
  }

  submit() {
    if (!this.form.valid) {
      return;
    }

    const event = new EventModel(this.event);
    const booking = new EventBookingModel(this.form.value);
    event.addBooking(booking);
    this.eventService.bookEvent(event).then(() => {
      this.isSuccess = true;
    });
  }

  cancel() {
    this.location.back();
  }

  seatsNotAvailableValidator(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    if (
      control.value !== undefined &&
      parseInt(control.value, 10) > this.event.seatsAvailable
    ) {
      return { seatsNotAvailable: true };
    }
    return null;
  }
}
