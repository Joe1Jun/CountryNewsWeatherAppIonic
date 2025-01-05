import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { DataServiceService } from '../services/data-service.service';

import { Location } from '@angular/common';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [ IonRadio, IonRadioGroup, IonList, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
   
  selectedTemperatureUnit! : string;
  value : string = "Units"

  // Takes data service and the pageLocation objects as parameters
  constructor(private mds : DataServiceService, private pageLocation : Location) { }

  ngOnInit() {
     
    
    
  }

  ionViewWillEnter(){

    this.getCurrentTemperatureUnit();
  }

  // Go back to the previous page.
  goBack() {
    this.pageLocation.back();
  }



  // This retrives the current unit being used from the storage and set the selected Temperature unit to it
  // This is possible due to two way binding.
  async getCurrentTemperatureUnit(){

    try {
    
      this.selectedTemperatureUnit = await  this.mds.getItem('Units')
      
      console.log(this.selectedTemperatureUnit)
  
        
      } catch (error) {
        
        console.log("Error with data service", error)
      }
  }

  // This saves the updated unit selection
  saveSelection(unitType : string) {
    
    try {

      this.mds.setItem(this.value , unitType);
      
    } catch (error) {
      
      console.log("Error setting storage item", error)
    }
      
      

  }

}