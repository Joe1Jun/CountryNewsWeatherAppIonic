import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCheckbox, IonButton, IonIcon } from '@ionic/angular/standalone';
import { DataServiceService } from '../services/data-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCheckbox, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink]
})
export class SettingsPage implements OnInit {
   
  selectedCelcius: boolean = false;
  selectedFahrenheit: boolean = false;
  selectedScientific: boolean = false;
  value : string = "temperatureType"

  constructor(private mds : DataServiceService) { }

  ngOnInit() {
    
  }

  saveSelection() {
    if (this.selectedCelcius) {
      this.mds.setItem(this.value, 'celcius')
        
      } else if (this.selectedFahrenheit) {
      this.mds.setItem(this.value, 'fahrenheit')
        console.log('Fahrenheit set successfully!');
      } else if (this.selectedScientific) {
       this.mds.setItem(this.value, 'scientific')
        console.log('Scientific set successfully!');
      }
  }

}