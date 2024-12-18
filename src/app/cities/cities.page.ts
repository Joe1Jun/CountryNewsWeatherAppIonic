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
@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonInput, IonButton, IonContent, CommonModule, FormsModule,RouterLink, Header2Page]
})
export class CitiesPage implements OnInit {
  
  capital! : string;
  country! : string;
  cities! : any [];
  weatherLocations : any[] = [];
  countryCode! : string ;
  cityLimit : number = 3;
  userLocationInput! : string;
  units! : string;
  storedWeatherLocations : any [] = []


  apiKey : string = '8bad249b0b4bef6ad8a518b937c7d010'
 
  constructor(private route : ActivatedRoute, private router : Router, private mhs : MyHttpServiceService, private mds : DataServiceService) { }

  ngOnInit() {

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

    setUpTemperature(){
      this.getTempType().then(() => {
       
        this.getFavouriteWeatherLocations();
    
    
      })
    }
    async getTempType(){
      const tempType = await this.mds.getItem('temperatureType');
      this.units = tempType;
      console.log(this.units)
   }

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
     
    this.getWeatherLocations(response.data[0].lat, response.data[0].lon, this.userLocationInput) 
    console.log(response.data[0].lat)
    console.log(response.data[0].lon); 
    
     
    }
    
     catch (error) {
    console.log("Error fetching coordinates" , error)
    
  }
     
     }

  }


  async getFavouriteWeatherLocations(){
    
    const response = await  this.mds.getArray('weatherLocations')
    console.log(response);
    this.storedWeatherLocations= response;
    if(!this.storedWeatherLocations || this.storedWeatherLocations.length === 0){
      this.getCities();
    }else{

      for(let i = 0 ;i <  this.storedWeatherLocations.length; i++){

        this.getWeather(this.storedWeatherLocations[i].id, this.storedWeatherLocations[i].name);
         

    }

   
      
    }
    
   
    
    
   
  }
  


  async getCities(){
     
    let options : HttpOptions = {
      
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${this.countryCode}&sort=-population&limit=${this.cityLimit}&types=CITY`,
     
     headers : {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': 'fa92f03d5amshb8d1244b10adbbbp102952jsn540534327d75'

     }

    }
try {

   const response = await this.mhs.get(options);
    console.log(response.data.data);
    this.cities = response.data.data
   
   
    for(let i = 0 ; i < this.cities.length; i++){
      
      this.getWeatherLocations( this.cities[i].latitude , this.cities[i].longitude, this.cities[i].name)   
      
   }
  

  
} catch (error) {

  console.log("Error retrieving data" , error)
  
}
  
    }

 async getWeatherLocations(lat : number, long : number, name : string){
    console.log(lat, long)



  try {
    let  options : HttpOptions = {
      url : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${this.units}&appid=${this.apiKey}`
    }
  
      const response =  await this.mhs.get(options);
     //Checks if the name matches the name from the cities API 
      let location = response.data
      if(location.name.toLowerCase() !== name ){
        location.name = name;
      }
     this.weatherLocations.push(location)
     
     console.log(this.weatherLocations)





  } catch (error) {
     console.log("Problem retrieving weather data", error)
  }

 
  }  

async getWeather(id:  number, name : string){
     
    
    
  let options : HttpOptions = {
   //url : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${this.units}&appid=${this.apiKey}`
   url : `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${this.apiKey}`

  }
 
 // Surround the API request in a try catch in case of errors.   
   try {
    // The Api response will be held in the response variable returned from myHttpService
    const response = await this.mhs.get(options);
    let location = response.data;
    console.log(location.name)
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

    this.mds.saveWeatherLocation('weatherLocations', location )
    
  }

  removeItemsFromArray (id : number){
       
    for(let i = 0 ; i < this.weatherLocations.length; i++){

      if(id === this.weatherLocations[i].id){
        this.weatherLocations.splice(this.weatherLocations[i])
      }
    }
    this.ionViewWillEnter();

  }




}
