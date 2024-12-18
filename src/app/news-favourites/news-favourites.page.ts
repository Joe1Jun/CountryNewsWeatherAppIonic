import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton } from '@ionic/angular/standalone';
import { DataServiceService } from '../services/data-service.service';
import { Header2Page } from '../shared/header2/header2.page';

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
    
    
    const response = await  this.mds.getArray("newsIE" )
    console.log(response);
    this.newsArticles= response;
    
   
    
    
   
  }

}
