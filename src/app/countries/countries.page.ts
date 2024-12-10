import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardHeader, IonCard,  IonCardTitle,  IonButton } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyHttpServiceService } from '../services/my-http-service.service';
import { ActivatedRoute,  RouterLink } from '@angular/router';
import { HeaderPage } from '../shared/header/header.page';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton,IonCardTitle, IonCard, IonCardHeader, IonContent,  CommonModule, FormsModule, RouterLink, HeaderPage]
})
export class CountriesPage implements OnInit {
   
  
  
  // This will store the searchTerm parameter in the route.
  searchTerm! : string;

  // countries will hole all the country objects retreived from the API.
  // Therefore is intialised as an empty array that can hold any type of data.
  countries : any [] = [];
  

  // Activated Route will be used to get the route parameter and assign it to the variable searchTerm
  constructor(private mhs : MyHttpServiceService, private route : ActivatedRoute) { }

  ngOnInit() {
    

    // Use activated route to get the parameter from the route.
    this.route.paramMap.subscribe((params) => {
       // Extract searchTerm from the route or default to an empty string
      this.searchTerm = params.get('searchTerm') || '';
      //If searchTerm is there call the method to get the countries from the route parameter
      if(this.searchTerm){
        this.getCountriesFromParams();
        //If there is no parameter retrieve all countries
        //**** REFINE THIS LATER AS AN OPTION FROM THE HOMEPAGE */
      } else{
        this.getAllCountries(); 
      }
    })

    //Cant implement the function in NgOnInit as it cant handle asynchronous functions
   
    
  }
// This function will return a list of all countries by making an HTTP GET request.
// It uses the 'get' method from MyHttpServiceService to fetch data based on the provided options.
    async getAllCountries(){
      // Assign the url to a local variable
       let options : HttpOptions = {
        url : "https://restcountries.com/v3.1/all"
      }
      try {
        const response = await this.mhs.get(options);
        //Will console log to see how best to access the objects returned from the api.
        // Will then populate the countries array with these objects.
        console.log(response.data);
        //Assign the array to the daat returned from the API
        this.countries = response.data;
        //Console log the array variable to see if it has been populated.
        console.log(this.countries);


        
      } catch (error) {
        console.log("Error retrieving countries", error);
      }
        
  }

  async getCountriesFromParams(){
      // Dynamically set the API URL for the search after 
      // Assign the url to a local variable
     let options : HttpOptions = {
      url: `https://restcountries.com/v3.1/name/${this.searchTerm}`,
    };
    try {
      const response = await this.mhs.get(options);
      this.countries = response.data;
      
      console.log(this.countries);

    } catch (error) {
      console.log("Error retrieving countries", error);
    }


  }

}
