import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CitiesPage implements OnInit {
  cities! : any [];
  countryCode! : string ;
  cityLimit : number = 5;

 
  constructor(private route : ActivatedRoute, private mhs : MyHttpServiceService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
        this.countryCode = params.get('countryCode') || ' '


    })

    this.getCities();
  }


  async getCities(){
       
    let options : HttpOptions = {
      url :  `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${this.countryCode}&sort=-population&limit=${this.cityLimit}`
    }
try {

   const response = await this.mhs.get(options);
    console.log(response.data);
    this.cities = response.data;
  
} catch (error) {
  
}
  
    

   }




}
