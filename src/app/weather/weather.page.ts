import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { HttpOptions } from '@capacitor/core';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherPage implements OnInit {
  // weather is actually an object as it only returns one object for each request
  weather : any  = {};
  // Indicates whether data is being fetched.
  loading! :boolean 
// This variable hold the url to the API that returns the weather data
 tempType! : string ;
  options : HttpOptions = {
    url : "http://api.weatherstack.com/current?access_key=08547bc95ccf226b8a72dcf4d47e5e94&query=New York"
  }


  constructor(private mhs : MyHttpServiceService, private mds :DataServiceService) { }

  ngOnInit() {
    // Call the getWeather method from ngOnInit as it is not possible to define an async method in ngOnInit
    
  }

 ionViewWillEnter(){
  this.getWeather()
}

async getTempType(){
   const tempType = await this.mds.getItem('temperatureType');
   this.tempType = tempType;
   console.log(this.tempType)
}

  async getWeather(){
    // Set loading to true while data is being fetched.
      this.loading = true;
   // Surround the API request in a try catch in case of errors.   
     try {
      // The Api response will be held in the response variable returned from myHttpService
      const response = await this.mhs.get(this.options);
      // Assign the object variable this.weather to the response data
     this.weather = response.data;
     // Console log to see full object in the console
     console.log(this.weather);
     // This will catch an error and display it in the console.
     } catch (error) {
        console.log("Error retrieving weather data" , error);
      
     } finally{
      // Set the loading once again to false once the try catch block has completed.
         this.loading = false;
     }


  }

}
