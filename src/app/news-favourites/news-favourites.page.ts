import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton } from '@ionic/angular/standalone';
import { DataServiceService } from '../services/data-service.service';
import { Header2Page } from '../shared/header2/header2.page';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-news-favourites',
  templateUrl: './news-favourites.page.html',
  styleUrls: ['./news-favourites.page.scss'],
  standalone: true,
  imports: [IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, CommonModule, FormsModule,Header2Page]
})
export class NewsFavouritesPage implements OnInit {
   
  newsArticles : any  [] = []
  

  constructor(private mds : DataServiceService) { }

  ngOnInit() {
   
  }

  ionViewWillEnter(){

    this.getFavouriteNewsArticles()
  }



  async getFavouriteNewsArticles(){
    
    
    const response = await  this.mds.getArray("news" )
    console.log(response);
    this.newsArticles= response;
    
   
    
    
   
  }

  async removeItem(id : number){

    console.log(id)
   
    try {
      // Remove the item from storage
      await this.mds.removeItemFromArray("news" ,  id);
  
       // Clear the existing news array
       this.newsArticles= [];
       // Fetch the updated news data
       console.log("Storage array : " + this.mds.getArray("news"))
      // call the ionic life cycle to re render the page with updated data.
      await this.ionViewWillEnter();
    } catch (error) {
      console.log("Error removing item or updating weather locations", error);
    }

  }
}
