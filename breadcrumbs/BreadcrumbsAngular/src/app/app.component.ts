import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  mapLat: number = 38.033554;
  mapLng: number = -78.507980;
  zoom: number = 16;
  selectedEvent:any = {
    title:"",
    organization:"",
    location:"",
    food:"",
    details:""
  }
  selectedEventDisplay:String = "";
  newEventTemp: any = {
    title: "",
    organization: "",
    location: "",
    city: "Charlottesville",
    food: "pizza",
    details: "1st floor lobby!",
    lat: "",
    lng: ""
  };
  newEvent: any = {
    title: "",
    organization: "",
    location: "",
    city: "Charlottesville",
    food: "",
    details: "",
    lat: "",
    lng: ""
  }
  loadedEvents: Array<any> = [
    {
      title: "WiCS Interest Meeting",
      organization: "WiCS",
      location: "Rice Hall",
      city: "Charlottesville",
      food: "pizza",
      details: "1st floor lobby!",
      lat: "",
      lng: ""
    },
    {
      title: "Google Panel",
      organization: "Google",
      location: "UVa Career Center",
      city: "Charlottesville",
      food: "bagels",
      details: "Come network with Google employees!",
      lat: "",
      lng: ""
    }
  ];
  displayEvents: Array<any> = [];

  constructor(private http: Http) {
    for (var i = 0; i < this.loadedEvents.length; i++) {
      var event = this.loadedEvents[i];
      this.getLocation(event);
    }
    console.log(this.displayEvents);
  }

  ngOnInit() {

  }

  getLocation(event: any) {
    var locateWords: Array<String> = event.location.split(" ")
    var Url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    for (var i = 0; i < locateWords.length; i++) {
      if (i == 0) {
        Url += locateWords[i];
      }
      else {
        Url += "+" + locateWords[i];
      }
    }
    Url += "+" + event.city;
    Url += "&key=AIzaSyBF8AgU4avgRn0oI4_aSc4GCHKRJt6MRcc"
    this.http
      .get(Url)
      .map(res => res.json())
      .subscribe(data => {
        event.lat = data.results[0].geometry.location.lat;
        event.lng = data.results[0].geometry.location.lng;
        this.displayEvents.push(event);
      });
  }


  viewEventDetails(event) {
    this.selectedEvent = event;
    this.selectedEventDisplay = "Free " + event.food + " at " + event.location + " provided by " + event.organization;
  }

  createEvent() {
    this.getLocation(this.newEvent);
    console.log(this.displayEvents);
  }

  cancel() {
    this.newEvent = this.newEventTemp;
  }
}
