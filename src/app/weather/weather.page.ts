import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton } from '@ionic/angular/standalone';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { HttpOptions } from '@capacitor/core';
import { DataServiceService } from '../services/data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Header2Page } from '../shared/header2/header2.page';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, CommonModule, FormsModule, Header2Page]
})
export class WeatherPage implements OnInit {
  //Taken from the params
  

  // weather is actually an object as it only returns one object for each request
  weather : any  = {};
  city! : string;
// This variable hold the url to the API that returns the weather data
  units! : string 
 latitude! : number;
 longitude! : number;

 
apiKey : string = '8bad249b0b4bef6ad8a518b937c7d010'


  constructor(private mhs : MyHttpServiceService, private mds :DataServiceService, private route : ActivatedRoute) { }

  ngOnInit() {
    // Call the getWeather method from ngOnInit as it is not possible to define an async method in ngOnInit
    this.route.paramMap.subscribe((params) =>{
      this.city = params.get('city') || '';
      this.latitude = parseFloat(params.get('lat')!);
      this.longitude = parseFloat(params.get('long')!);

      console.log('Latitude:', this.latitude); 
      console.log('Longitude:', this.longitude); 
      
     })

    
    
    
   
    
    this.setUpTemperature();
   
   

  }

 ionViewWillEnter(){
  
}

//This promise inside the method is essential so that the units specified by the user 
// can be added to the API route. Otherwise the weather data woud render before units is retrieved from storage
setUpTemperature(){
  this.getTempType().then(() => {
    this.getWeather()


  })
}

async getTempType(){
   const tempType = await this.mds.getItem('temperatureType');
   this.units = tempType;
   console.log(this.units)
}

  async getWeather(){
     

    
    let options : HttpOptions = {
     url : `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=${this.units}&appid=${this.apiKey}`
    }
   
   // Surround the API request in a try catch in case of errors.   
     try {
      // The Api response will be held in the response variable returned from myHttpService
      const response = await this.mhs.get(options);
      // Assign the object variable this.weather to the response data
     this.weather = response.data;
     // Console log to see full object in the console
     console.log(this.weather);
     // This will catch an error and display it in the console.
     } catch (error) {
        console.log("Error retrieving weather data" , error);
      
     } 


  }

  saveWeatherLocations(){
    //Should just save the parameters needed to make the API call from the favourites page
    // So just need longitude and latitude
    
    // This object holds the values to be saved to storage
    const location = {
      latiude :this.latitude,
      longitude : this.longitude
    }

    this.mds.saveWeatherLocation('weatherLocations', location )
    
  }

}
