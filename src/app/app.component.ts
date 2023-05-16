import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ElementRef, Optional, Inject, } from '@angular/core';
import { LoggerService } from './logger.service';
import { RoomsComponent } from './rooms/rooms.component';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  //template:'<h1>Hello world from inline template<h1>',
  styleUrls: ['./app.component.scss']
  // styles: ['h1{color:red;}']
})
export class AppComponent implements OnInit {

  title = 'hotelInventoryApp';

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(@Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }

  ngOnInit() {
    // this.router.events.subscribe((event) =>{
    //   console.log(event);
    // });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event) => {
      console.log('Navigation Started');
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      console.log('Navigation Completed');
    });

    this.loggerService?.log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerText = "Ganesh Hotel";

    this.localStorage.setItem('name', 'Ganesh Hotel');

  }

  //@ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  //ngAfterViewInit() {
  // const ComponentRef = this.vcr.createComponent(RoomsComponent);
  //  ComponentRef.instance.numberOfRooms = 50;
  //}

}