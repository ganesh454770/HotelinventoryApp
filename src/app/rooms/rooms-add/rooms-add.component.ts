import { Component, OnInit } from '@angular/core';
import { Room, RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent implements OnInit {

  room: RoomList = {
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  };

  sucessmessage: string = '';


  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void { }

  AddRoom(roomsForm: NgForm) {
    this.roomsService.addRooms(this.room).subscribe((data) => {
      this.sucessmessage = 'Room Added Successfully'; 
      roomsForm.resetForm({
        roomType: '',
        amenities: '',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        photos: '',
        price: 0,
        rating: 0, 
      }); 
    });
 
  }
}

