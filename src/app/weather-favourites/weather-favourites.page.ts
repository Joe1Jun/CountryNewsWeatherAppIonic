import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { DataServiceService } from '../services/data-service.service';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { HttpOptions } from '@capacitor/core';
import { Header2Page } from '../shared/header2/header2.page';
@Component({
  selector: 'app-weather-favourites',
  templateUrl: './weather-favourites.page.html',
  styleUrls: ['./weather-favourites.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, Header2Page]
})
export class WeatherFavouritesPage implements OnInit {

  weatherLocations : any = []
  // tHIS VARIABLES
  coordinates : any  = [];
  
  units! : string 
 
 apiKey : string = '8bad249b0b4bef6ad8a518b937c7d010'
  constructor(private mds :DataServiceService, private mhs : MyHttpServiceService) { }

  ngOnInit() {

   
  }

  
 // Lifecycle hook: Runs every time the page is about to be displayed.
 //Using `ionViewWillEnter` ensures that storage and other asynchronous dependencies
  //are fully initialized before fetching weather favourites.
 // This avoids timing issues that occur with `ngOnInit`, which may run too early.
 
  ionViewWillEnter() {
    this.getFavouriteWeatherLocations();
}


  async getFavouriteWeatherLocations(){
     
    const response = await  this.mds.getArray('weatherLocations')
    console.log(response);
    this.coordinates = response;

    for(let i = 0 ;i <  this.coordinates.length; i++){
      this.getWeather(this.coordinates[i].latitude, this.coordinates[i].longitude);
     
      
    }
    
   
    
    
   
  }


  async getWeather(latitude : number, longitude : number){
     
    
    
    let options : HttpOptions = {
     url : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${this.units}&appid=${this.apiKey}`
    }
   
   // Surround the API request in a try catch in case of errors.   
     try {
      // The Api response will be held in the response variable returned from myHttpService
      const response = await this.mhs.get(options);

      // this populates the weather array as the items are retrieved from the API
     this.weatherLocations.push(response.data);
     // Console log to see full object in the console
     console.log(this.weatherLocations);
     // This will catch an error and display it in the console.
     } catch (error) {
        console.log("Error retrieving weather data" , error);
      
     } 


  }

  removeItem(id : number){

    console.log(id)
    this.mds.removeItemFromArray('weatherLocations', id)
   
    
  }
}
