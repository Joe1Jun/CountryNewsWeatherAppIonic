import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonText, IonSpinner } from '@ionic/angular/standalone';
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
  imports: [IonSpinner, IonText, IonButton,  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, CommonModule, FormsModule, Header2Page]
})
export class NewsPage implements OnInit {
 
 apiKey! : string;
 country! :string;
 countryCode! : string; 
 news : any [] = [];
  // This flag controls the spinner and also allows the newsIsFetched flag to be set in the correct sequence.
  isLoading: boolean = false;  
   // Sets news fetched to false. If this is false a message is displayed to the user
  newsIsFetched: boolean = false;
 
  
constructor(private mhs : MyHttpServiceService, private mds : DataServiceService, private mApi : ApiService ,  private route: ActivatedRoute){}

  ngOnInit(): void {
    
    // This fetches the news api from the api service
   this.apiKey = this.mApi.getNewsAPI();
    
   // Sets the variables to the parameters passed via the route handler
    this.route.paramMap.subscribe((params) => {
      this.country = params.get('country') || ' ';
      this.countryCode = params.get('countryCode') || '';
      console.log(this.countryCode)
      if(this.countryCode){
       this.getNews();
      }
  })

     
  }


  
  //This asynchronous function will call the get function from the myHttpService
  async getNews(){
    this.isLoading = true;  // Set loading to true when starting the request

    let options : HttpOptions = {
      url : `https://newsdata.io/api/1/latest?apikey=pub_${this.apiKey}&country=${this.countryCode}`
    }


    try {
      // Stores the response from the API in a varaible called response  
    const response = await this.mhs.get(options);
    

    // Check if data exists in the response
    if (response.data && response.data.results && response.data.results.length > 0) {
      this.news = response.data;           // Populate the news array
      this.newsIsFetched = true;          // Mark as fetched only after valid data is received
    } else {
      this.newsIsFetched = false;         // No news data
    }
    

    // Log the data to the console to inspect the attributes
    console.log(response.data.results);
 
    // Populate the array with the news objects 
    this.news = response.data.results;
    //console log to check if it matches
    console.log(this.news);
    

    } catch (error) {
      
      console.log("Error retriving news ", error)
      this.newsIsFetched = false;
    }finally {
      this.isLoading = false;  // Set loading to false when complete
    }
     

  }
  
// Calls the data service to save the news article to the storage array
  saveItem(newsArticle : any){

    try {
      console.log(newsArticle)
      //The full artcle is saved 
      const newsItem= {
        newsArticle : newsArticle
        
      }
  
      this.mds.saveItemToArray("news", newsArticle)

      
    } catch (error) {
      
      console.log("Error saving news article", error);
    }
    
    
    
  }


  

}
