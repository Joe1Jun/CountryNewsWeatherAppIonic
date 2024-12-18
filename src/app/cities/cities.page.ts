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

  country! : string;
  cities! : any [];
  weatherLocations : any[] = [];
  countryCode! : string ;
  cityLimit : number = 3;
  userLocationInput! : string;
  
  units! : string;
  


  apiKey : string = '8bad249b0b4bef6ad8a518b937c7d010'
 
  constructor(private route : ActivatedRoute, private router : Router, private mhs : MyHttpServiceService, private mds : DataServiceService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.country = params.get('country') || ''
      this.countryCode = params.get('countryCode') || ' '


    })
  
    
  }
// This method is called when the user clicks the button to submit the data
  ionViewWillEnter(){
    this.setUpTemperature();

    }

    setUpTemperature(){
      this.getTempType().then(() => {
        this.getCities()
    
    
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
     
    this.getWeatherLocations(response.data[0].lat, response.data[0].lon) 
    console.log(response.data[0].lat)
    console.log(response.data[0].lon); 
    
     
    }
    
     catch (error) {
    console.log("Error fetching coordinates" , error)
    
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
      this.getWeatherLocations( this.cities[i].latitude , this.cities[i].longitude)   

   }
  

  
} catch (error) {

  console.log("Error retrieving data" , error)
  
}
  
    }

 async getWeatherLocations(lat : number, long : number){
    console.log(lat, long)


 let  options : HttpOptions = {
    url : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${this.units}&appid=${this.apiKey}`
  }

   let location =  await this.mhs.get(options);

   this.weatherLocations.push(location)
   console.log(this.weatherLocations)
  }  




}
