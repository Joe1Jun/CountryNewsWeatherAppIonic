import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonIcon } from '@ionic/angular/standalone';
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
  imports: [IonIcon, IonText, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonInput, IonButton, IonContent, CommonModule, FormsModule,RouterLink, Header2Page]
})



export class WeatherPage implements OnInit {
// All the instance variables to be used by the class and component

  apiKey! : string;
  capital! : string;
  capitalWeather : any = null // Declares it as an object instead of an array
  country! : string;
  weatherLocations : any[] = [];
  countryCode! : string ;
  userLocationInput! : string;
  units! : string;
  storedWeatherLocations : any [] = []
  isError : boolean = false;
  message! : string;

  
  //Initialises several services and routers to be used by the class
  constructor(private route : ActivatedRoute, private router : Router, private mhs : MyHttpServiceService, private mds : DataServiceService, private mApi : ApiService) { }

  ngOnInit() {
    // This retrieves the apikey from the service
    this.apiKey = this.mApi.getWeatherAPI();
  // The parameters passed from the countries page are stored in the instance variables
    this.route.paramMap.subscribe((params) => {
      this.country = params.get('country') || ''
      this.countryCode = params.get('countryCode') || ' '
      this.capital = params.get('capital') || ''

    })
  
    
  }
// This method is called when the user clicks the button to submit the data

  ionViewWillEnter(){
    //Need to clear all the instance varaible arrays so that duplicates
    // are not created 
    // Because this life cycle is called numerous times some of the varibales need to be reset;
    // This ensures that new items pushed to the storage array are not duplicated and then rendered on the page.
    this.weatherLocations = [];
    this.storedWeatherLocations = [];
    this.capitalWeather = null;
    this.isError = false

    this.setUpTemperature();
   
    }
 // This method retrieved the temperature type from the settings storage 
    // The methods here are chained using asyn await and a try catch clock to ensure one completed only after the other has finished
    
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

    //This method uses the capital passed from the countries page to retrieve weather data for the capital
   // This method is called first because it sits above all other weather cards.
   async getCapitalWeather() {
    try {
       //The url is passed to the helper method to retrieve the weather data 
      const url =  `https://api.openweathermap.org/data/2.5/weather?q=${this.capital}&units=${this.units}&appid=${this.apiKey}`
      
      
      const response = await this.getWeatherDataFromService(url);
      // Sets the reponse data to the object variable capitalWeather.
      this.capitalWeather = response.data; 
      console.log(this.capitalWeather);
     
    } catch (error) {
      console.log("Error fetching capital weather data:", error);
    }
  }

  //This method will retrieve the response data sent back from the service
  // This method is to avoid duplicate code
  async getWeatherDataFromService(url : string) : Promise<any>{
       
       try {
          const options : HttpOptions = {url};
          const response = await this.mhs.get(options);
          return response;
       } catch (error) {
          console.log("Error retrieving weather data :" , error);
       }

  }

// This sets the error flag to true if the location doesnt exist in the country the user is searching in.
  noDataForLocation(){
     this.isError = true;
     this.message = `Location "${this.userLocationInput}" does not exist in ${this.country}`
    
  }

  async getUserInputLocationCoordinates(){
    //checks if the user has inputted any data
     if(this.userLocationInput){
     // Resets the error boolean to false
      this.isError = false;  
     
      // This url attachs the country code to the user input making sure only locations from the specific countries can be fetched.
     const  url = `https://api.openweathermap.org/data/2.5/weather?q=${this.userLocationInput},${this.countryCode}&units=${this.units}&appid=${this.apiKey}`

     
  try {

    const response = await this.getWeatherDataFromService(url);
    let location = response.data
     
      if(location.name.toLowerCase() !== this.userLocationInput ){
        location.name = this.userLocationInput;
      }
     // This adds the user location to the array
     this.weatherLocations.push(location)
    
     this.saveWeatherLocations(location.id, location.name);
     

     console.log(this.weatherLocations)

    
     // Reset the input to show the placeholder
     this.userLocationInput = ''
    }
    
     catch (error) {
      
    console.log("Error fetching coordinates" , error)
    this.noDataForLocation();
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
      for(let i = 0 ;i <  this.storedWeatherLocations.length; i++){

        this.getStoredLocationsCurrentWeather(this.storedWeatherLocations[i].id, this.storedWeatherLocations[i].name);
         }
    
   }
  

async getStoredLocationsCurrentWeather(id:  number, name : string){
     
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=${this.units}&appid=${this.apiKey}`

  
 
 // Surround the API request in a try catch in case of errors.   
   try {
    // The Api response will be held in the response variable returned from myHttpService
    const response = await this.getWeatherDataFromService(url);
    let location = response.data;
    console.log(location.name)

   


    // Sometime the name can be differnt when returned from the API . This ensures that the name displayed is the same
    // as what the user saved
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
    
    // This object holds the values to be saved to storage
    const location = {
      id : id,
      name : name
    }

    this.mds.saveItemToArray("weather" + this.countryCode, location )
    
  }

  async removeLocation(id : number){

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