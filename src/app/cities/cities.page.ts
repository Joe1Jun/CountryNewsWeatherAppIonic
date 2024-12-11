import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CitiesPage implements OnInit {

  country! : string;
  cities! : any [];
  countryCode! : string ;
  cityLimit : number = 5;

 
  constructor(private route : ActivatedRoute, private mhs : MyHttpServiceService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.country = params.get('country') || ''
      this.countryCode = params.get('countryCode') || ' '


    })

    
  }

  ionViewWillEnter(){
    this.getCities()
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
   // Filter the cities where type is 'CITY'
   this.cities = response.data.data
  

  
} catch (error) {
  
}
  
    

   }




}
