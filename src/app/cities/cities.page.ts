import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { HttpOptions } from '@capacitor/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Header2Page } from '../shared/header2/header2.page';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink, Header2Page]
})
export class CitiesPage implements OnInit {

  country! : string;
  cities! : any [];
  countryCode! : string ;
  cityLimit : number = 5;
  userLocationInput! : string;
  //This will hold the value of the lat and long values of the user input city returned from the api call 
  latitude! : number;
  longitude! : number;
  apiKey : string = '8bad249b0b4bef6ad8a518b937c7d010'
 
  constructor(private route : ActivatedRoute, private router : Router, private mhs : MyHttpServiceService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.country = params.get('country') || ''
      this.countryCode = params.get('countryCode') || ' '


    })
  this.getCities();
    
  }
// This method is called when the user clicks the button to submit the data
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
    this.latitude = response.data[0].lat
    this.longitude = response.data[0].lon;
    console.log(this.latitude)
    console.log(this.longitude); 
    
     // Navigate to the weather page with coordinates 
     // If the API has returned correct coordinated the Router will automatically navigate to the weather page
     // passing the parameters
     this.router.navigate(['/weather', this.userLocationInput, this.latitude, this.longitude]);
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
    console.log(response.data);
   
   this.cities = response.data.data
  

  
} catch (error) {

  console.log("Error retrieving data" , error)
  
}
  
    

   }




}
