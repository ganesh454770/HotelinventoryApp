import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { Subscriber, exhaustMap, mergeMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private BookingService: BookingService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid'); 
    this.bookingForm = this.fb.group({
      roomId: new FormControl({ value: '2', disabled: true }, { validators: [Validators.required] }),
      guestEmail: ['', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email],
      },
      ],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { updateOn: 'blur' }],
      guestName: ['', [Validators.required, Validators.minLength(5), CustomValidator.validateName,
      CustomValidator.ValidateSpecialChar('*'),
      ]],
      address: this.fb.group({
        addressline1: ['', { validators: [Validators.required] }],
        addressline2: [''],
        city: ['', { validators: [Validators.required] }],
        state: ['', { validators: [Validators.required] }],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
    }, {updateOn:'blur', validators: [CustomValidator.validatedate] });

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //  this.BookingService.bookRoom(data).subscribe((data)=> {})
    // });

    this.bookingForm.valueChanges.pipe(
      exhaustMap((data) => this.BookingService.bookRoom(data))
    ).subscribe((data) => console.log(data));
  }

  addBooking() {
    // console.log(this.bookingForm.getRawValue());
    // this.BookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => { console.log(data);
    //  });
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressline1: '',
        addressline2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  getBookingData() {
    this.bookingForm.patchValue({
      roomId: '2',
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('10-feb-2020'),
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressline1: '',
        addressline2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    })
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl('')
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}