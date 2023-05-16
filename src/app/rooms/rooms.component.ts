import { Component, DoCheck, OnInit, ViewChild, AfterViewInit, AfterViewChecked, QueryList, ViewChildren, OnDestroy, SkipSelf } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';
import { ShareddataService } from '../services/shareddata.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  hotelName = 'Ganesh Hotel';
  numberOfRooms = 10;

  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Rooms List';

  roomList: RoomList[] = [];

  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenCompnent!: QueryList<HeaderComponent>;

  //roomServices = new RoomServices
  error$ = new Subject<string>();


  totalBytes = 0;

  subscription !: Subscription;

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      this.error$.next(err.message);
      return of([]);
    })
  );
  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));
  message$ = this.SharedDataService.message$;


  constructor(
    @SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService,
    private SharedDataService: ShareddataService
    ) { }


  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    })

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });
    this.stream.subscribe((data) => console.log(data));
    // this.subscription =this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
  }

  ngDoCheck() {
    console.log('on changes is called')
  }

  ngAfterViewInit() {
    // this.headerComponent.title = "Rooms View";

    // console.log(this.headerChildrenCompnent);
  }

  ngAfterViewChecked() {


  }
  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }


  addRoom() {
    const room: RoomList = {
      //roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air conditioner, free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvb21zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      checkinTime: new Date('11-nov-2022'),
      checkoutTime: new Date('12-nov-2022'),
      rating: 2.6,
    };
    //this.roomList.push(room);
    this.roomsService.addRooms(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air conditioner, free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJvb21zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      checkinTime: new Date('11-nov-2022'),
      checkoutTime: new Date('12-nov-2022'),
      rating: 2.6,
    };
    //this.roomList.push(room);
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


//getData -> addData -> getData

//getData -> continues stream of data ->addData