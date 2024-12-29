import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { HttpOptions } from '@capacitor/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Header2Page } from '../shared/header2/header2.page';
import { DataServiceService } from '../services/data-service.service';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonInput, IonButton, IonContent, CommonModule, FormsModule,RouterLink, Header2Page]
})

// **ORGANISE INTO MULTIPLE CLASSES MAYBE
// ** NEED TO FIND SOLUTION TO TEMP TYPE NOT CHANGING
// ** 

export class WeatherPage implements OnInit {


  apiKey! : string;
  capital! : string;
  capitalWeather : any = null // Declares it as an object instead of an array
  country! : string;
  weatherLocations : any[] = [];
  countryCode! : string ;
  userLocationInput! : string;
  units! : string;
  storedWeatherLocations : any [] = []


  
 
  constructor(private route : ActivatedRoute, private router : Router, private mhs : MyHttpServiceService, private mds : DataServiceService, private mApi : ApiService) { }

  ngOnInit() {
    // This retrieves the apikey from the service
    this.apiKey = this.mApi.getWeatherAPI();

    this.route.paramMap.subscribe((params) => {
      this.country = params.get('country') || ''
      this.countryCode = params.get('countryCode') || ' '
      this.capital = params.get('capital') || ''

    })
  
    
  }
// This method is called when the user clicks the button to submit the data
  ionViewWillEnter(){
    this.setUpTemperature();
   
    }

   async  setUpTemperature(){
      try {
         await this.getTempType();
         await this.getCapitalWeather()
         await this.getFavouriteWeatherLocations();

      } catch (error) {
        console.log("Failed to retrieve units" , error)
      }
    }
    async getTempType(){
      const units = await this.mds.getItem('Units');
      this.units = units;
      console.log(this.units)
   }

   async getCapitalWeather() {
    try {
      const options: HttpOptions = {
        url: `https://api.openweathermap.org/data/2.5/weather?q=${this.capital}&units=${this.units}&appid=${this.apiKey}`,
      };
  
      const response = await this.mhs.get(options);
      this.capitalWeather = response.data; // Store the capital's weather data
      console.log(this.capitalWeather);
     
    } catch (error) {
      console.log("Error fetching capital weather data:", error);
    }
  }

  // async getWeatherDataFromService(url : string) : Promise<any>{
       
  //      try {
  //         const options : HttpOptions = {url};
  //         const response = await this.mhs.get(options);
  //         return response.data;
  //      } catch (error) {
  //         console.log("Error retrieving weather data :" , error);
  //      }

  // }

  async getUserInputLocationCoordinates(){
    //checks if the user has inputted any data
     if(this.userLocationInput){
      //This route transforms to the open weather API 
     let options : HttpOptions = {
        url : `http://api.openweathermap.org/geo/1.0/direct?q=${this.userLocationInput},${this.countryCode}&appid=${this.apiKey}`

     }
  try {

    const response = await this.mhs.get(options);
    
    console.log(response.data);
     
    this.getUserInputtedWeatherLocations(response.data[0].lat, response.data[0].lon, this.userLocationInput) 
    console.log(response.data[0].lat)
    console.log(response.data[0].lon); 
    
     
    }
    
     catch (error) {
    console.log("Error fetching coordinates" , error)
    
  }
     
     }

  }

  

  

  //This method loads all the weather locations saved previously by the user
  async getFavouriteWeatherLocations(){
    
    // Get the locations saved by the user from the data service
    const response = await  this.mds.getArray("weather" + this.countryCode)
    console.log(response);
    this.storedWeatherLocations= response;
   
    
     //Loop through the locations and pass the data to the getWeather function so that the latest weather for these
     // stored locations can be retrieved from the
      for(let i = 1 ;i <  this.storedWeatherLocations.length; i++){

        this.getStoredWeatherLocations(this.storedWeatherLocations[i].id, this.storedWeatherLocations[i].name);
         }
    
   }
  


  

 async getUserInputtedWeatherLocations(lat : number, long : number, name : string){
    

 try {
    let  options : HttpOptions = {
      url : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${this.units}&appid=${this.apiKey}`
    }
  
      const response =  await this.mhs.get(options);
     
      let location = response.data
      if(location.name.toLowerCase() !== name ){
        location.name = name;
      }
     // This adds the user location to the array
     this.weatherLocations.push(location)
    
     this.saveWeatherLocations(location.id, location.name);
     

     console.log(this.weatherLocations)





  } catch (error) {
     console.log("Problem retrieving weather data", error)
  }

 
  }  

async getStoredWeatherLocations(id:  number, name : string){
     
    
    
  let options : HttpOptions = {
   
   url : `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${this.apiKey}`

  }
 
 // Surround the API request in a try catch in case of errors.   
   try {
    // The Api response will be held in the response variable returned from myHttpService
    const response = await this.mhs.get(options);
    let location = response.data;
    console.log(location.name)
    // In the weatherAPI the location coordinates 
    if(location.name != name){
      location.name = name 
    }


    // this populates the weather array as the items are retrieved from the API
   this.weatherLocations.push(response.data);
   // Console log to see full object in the console
   console.log(this.weatherLocations);
   // This will catch an error and display it in the console.
   } catch (error) {
      console.log("Error retrieving weather data" , error);
    
   } 


}

  saveWeatherLocations(id : number, name : string){
    //Should just save the parameters needed to make the API call from the favourites page
    // So just need longitude and latitude
    
    // This object holds the values to be saved to storage
    const location = {
      id : id,
      name : name
    }

    this.mds.saveItemToArray("weather" + this.countryCode, location )
    
  }

  async removeItem(id : number){

    console.log(id)
   
    try {
      // Remove the item from storage
      await this.mds.removeItemFromArray("weather" + this.countryCode, id);
  
       // Clear the existing weather locations array
       this.weatherLocations = [];
       console.log("Storage array : " + this.mds.getArray("weather" + this.countryCode))
      // Fetch the updated weather data
      await this.ionViewWillEnter();
    } catch (error) {
      console.log("Error removing item or updating weather locations", error);
    }
  }
    




}
