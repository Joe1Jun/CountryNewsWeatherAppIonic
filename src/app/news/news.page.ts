import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyHttpServiceService } from '../services/my-http-service.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NewsPage implements OnInit {

 news : any [] = [];
 // The news Url with the API key. Should add ENV file for this key later
 
 options : HttpOptions = {
  url : "https://newsdata.io/api/1/latest?apikey=pub_61622a995ddc5cb7fb915bb2f0a5afa140633"
}
  
constructor(private mhs : MyHttpServiceService){}

  ngOnInit(): void {
      this.getNews();
  }

  //This asynchronous function will call the get function from the myHttpService
  async getNews(){
     // Stores the response from the API in a varaible called response  
    const response = await this.mhs.get(this.options);
    // Log the data to the console to inspect the attributes
    console.log(response.data.results);
 
    // Populate the array with the news objects 
    this.news = response.data.results;
    //console log to check if it matches
    console.log(this.news);

  }
  


  

}
