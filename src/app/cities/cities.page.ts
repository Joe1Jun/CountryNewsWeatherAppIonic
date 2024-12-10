import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyHttpServiceService } from '../services/my-http-service.service';

import { HttpOptions } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CitiesPage implements OnInit {

  limit : number = 5;
  countryCode! : string;
  apiKey : string = '8bad249b0b4bef6ad8a518b937c7d010'
  constructor(private mhs : MyHttpServiceService, private route: ActivatedRoute) { }

  cities : any [] = [];

  ngOnInit() {
     this.route.paramMap.subscribe((params) =>{
      this.countryCode = params.get('countryCode') || ' ';
      console.log(this.countryCode)
     })


    this.getCities()
  }

async getCities(){
   let options : HttpOptions = {
     url : `http://api.openweathermap.org/geo/1.0/direct?q=${this.countryCode}&limit=${this.limit}&appid=${this.apiKey}`
   }
   const response =  await this.mhs.get(options)
   console.log(response.data);
   this.cities = response.data;
   console.log(this.cities);

   
   

}

}
