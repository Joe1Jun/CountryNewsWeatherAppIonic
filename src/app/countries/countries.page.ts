import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCard,  IonCardTitle,  IonButton } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton,  IonCardTitle, IonCard, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink]
})
export class CountriesPage implements OnInit {
  // countries will hole all the country objects retreived from the API.
  // Therefore is intialised as an empty array that can hold any type of data.
  countries : any [] = [];
  options : HttpOptions = {
    url : "https://restcountries.com/v3.1/all"
  }

  constructor(private mhs : MyHttpServiceService) { }

  ngOnInit() {
    //Cant implement the function in NgOnInit as it cant handle asynchronous functions
    this.getAllCountries(); 
    
  }
// This function will return a list of all countries by making an HTTP GET request.
// It uses the 'get' method from MyHttpServiceService to fetch data based on the provided options.
    async getAllCountries(){
        const response = await this.mhs.get(this.options);
        //Will console log to see how best to access the objects returned from the api.
        // Will then populate the countries array with these objects.
        console.log(response.data);
        //Assign the array to the daat returned from the API
        this.countries = response.data;
        //Console log the array variable to see if it has been populated.
        console.log(this.countries);
  }

}
