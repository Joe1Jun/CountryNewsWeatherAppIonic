import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {
  // countries will hole all the country objects retreived from the API.
  // Therefore is intialised as an empty array that can hold any type of data.
  countries : any [] = [];
  option : HttpOptions = {
    url : "https://restcountries.com/v3.1/all"
  }

  constructor() { }

  ngOnInit() {
     

  }

}
