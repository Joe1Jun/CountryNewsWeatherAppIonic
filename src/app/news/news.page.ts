import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { Header2Page } from '../shared/header2/header2.page';
@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonButton,  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, CommonModule, FormsModule, Header2Page]
})
export class NewsPage implements OnInit {
 
 loading! : boolean;
 country! :string;
 countryCode! : string; 
 news : any [] = [];
 
 // The news Url with the API key. Should add ENV file for this key later
 
 
  
constructor(private mhs : MyHttpServiceService, private mds : DataServiceService, private route: ActivatedRoute){}

  ngOnInit(): void {
    

    

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
    this.loading = true;
    let options : HttpOptions = {
      url : `https://newsdata.io/api/1/latest?apikey=pub_61622a995ddc5cb7fb915bb2f0a5afa140633&country=${this.countryCode}`
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
    }finally{
      this.loading = false;
    }
     

  }
  

  saveItem(id : string){
    
    const newsArticle= {
      id : id,
      
    }

    this.mds.saveItemToArray("news" + this.countryCode, newsArticle)
    
  }


  

}
