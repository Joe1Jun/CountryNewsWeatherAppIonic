import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCheckbox, IonButton, IonIcon } from '@ionic/angular/standalone';
import { DataServiceService } from '../services/data-service.service';

import { Location } from '@angular/common';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCheckbox, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
   
  selectedTemperatureUnit! : string;
  value : string = "Units"

  constructor(private mds : DataServiceService, private pageLocation : Location) { }

  ngOnInit() {
     
    if(this.selectedTemperatureUnit === null){
       this.saveSelection('metric')
    }
    
  }

  goBack() {
    this.pageLocation.back();
  }

  async getCurrentTemperatureUnit(){

    this.selectedTemperatureUnit = await  this.mds.getItem('Units')
    console.log(this.selectedTemperatureUnit)
  }

  saveSelection(unitType : string) {
    
      this.mds.setItem(this.value , unitType);
      

      this.goBack();
  }

}