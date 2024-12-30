import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCheckbox, IonButton, IonIcon, IonList, IonRadioGroup, IonItem, IonRadio, IonItemDivider } from '@ionic/angular/standalone';
import { DataServiceService } from '../services/data-service.service';

import { Location } from '@angular/common';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonRadio, IonItem, IonRadioGroup, IonList, IonIcon, IonButton, IonCheckbox, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
   
  selectedTemperatureUnit! : string;
  value : string = "Units"

  constructor(private mds : DataServiceService, private pageLocation : Location) { }

  ngOnInit() {
     
    
    
  }

  ionViewWillEnter(){

    this.getCurrentTemperatureUnit();
  }

  goBack() {
    this.pageLocation.back();
  }



  async getCurrentTemperatureUnit(){

    try {
    
      this.selectedTemperatureUnit = await  this.mds.getItem('Units')
      
      console.log(this.selectedTemperatureUnit)
  
        
      } catch (error) {
        
        console.log("Error with data service", error)
      }
  }

  saveSelection(unitType : string) {
    
    try {

      this.mds.setItem(this.value , unitType);
      
    } catch (error) {
      
      console.log("Error setting storage item", error)
    }
      
      

  }

}