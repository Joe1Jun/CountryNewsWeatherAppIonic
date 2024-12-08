import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {

  weather : any [] = [];

  options : HttpOptions = {
    url : "http://api.weatherstack.com/current?access_key=08547bc95ccf226b8a72dcf4d47e5e94&query=New York"
  }

  // http://api.weatherstack.com/current
  // ? access_key = 08547bc95ccf226b8a72dcf4d47e5e94
  // & query = New York
  constructor(private mhs : MyHttpServiceService) { }

  ngOnInit() {
    this.getWeather()
  }

  async getWeather(){
      const response = await this.mhs.get(this.options);
      console.log(response.data);
     


  }

}
