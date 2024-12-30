import { Component } from '@angular/core';
import { IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderPage } from '../shared/header/header.page';
import { DataServiceService } from '../services/data-service.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonContent,RouterLink, FormsModule,HeaderPage],
})
export class HomePage  {
  
  searchTerm! : string
  selectedTemperatureUnit! : string;

  constructor(private mds : DataServiceService) {}

  
//Call the method to check what temperature Unit is being used
  ionViewWillEnter(){
    this.getCurrentTemperatureUnit();
  }

  async getCurrentTemperatureUnit(){
   console.log("TEST2")
    try {
    console.log("TEST3")
    this.selectedTemperatureUnit = await  this.mds.getItem('Units')
    if(!this.selectedTemperatureUnit){
      this.saveSelection('metric')
    }
    console.log(this.selectedTemperatureUnit)

      
    } catch (error) {
      
      console.log("Error with data service", error)
    }

  }

  saveSelection(unitType : string) {

    try {

      this.mds.setItem('Units', unitType);
      
    } catch (error) {
      console.log("Could not set item", error)
    }
    
    
    

    
}

  
}
