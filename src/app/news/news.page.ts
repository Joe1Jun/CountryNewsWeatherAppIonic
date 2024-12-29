import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { Header2Page } from '../shared/header2/header2.page';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonButton,  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, CommonModule, FormsModule, Header2Page]
})
export class NewsPage implements OnInit {
 
 apiKey! : string;
 country! :string;
 countryCode! : string; 
 news : any [] = [];
 
 // The news Url with the API key. Should add ENV file for this key later
 
 
  
constructor(private mhs : MyHttpServiceService, private mds : DataServiceService, private mApi : ApiService ,  private route: ActivatedRoute){}

  ngOnInit(): void {
    
   this.apiKey = this.mApi.getNewsAPI();
    

    this.route.paramMap.subscribe((params) => {
      this.country = params.get('country') || ' ';
      this.countryCode = params.get('countryCode') || '';
      console.log(this.countryCode)
      if(this.countryCode){
       this.getNews();
      }
  })

     
  }

  ionViewWillEnter(){
    

  }

  
  //This asynchronous function will call the get function from the myHttpService
  async getNews(){
    
    let options : HttpOptions = {
      url : `https://newsdata.io/api/1/latest?apikey=pub_${this.apiKey}&country=${this.countryCode}`
    }


    try {
      // Stores the response from the API in a varaible called response  
    const response = await this.mhs.get(options);
    // Log the data to the console to inspect the attributes
    console.log(response.data.results);
 
    // Populate the array with the news objects 
    this.news = response.data.results;
    //console log to check if it matches
    console.log(this.news);

    } catch (error) {
      console.log("Error retriving news ", error)
    }
     

  }
  

  saveItem(newsArticle : any){
    
    console.log(newsArticle)
    const newsItem= {
      newsArticle : newsArticle
      
    }

    this.mds.saveItemToArray("news", newsArticle)
    
  }


  

}
