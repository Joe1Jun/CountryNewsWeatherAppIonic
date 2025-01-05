import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

// Responsible for retrieving the api keys from the environment or env
export class ApiService {

  constructor() { }

// Gets the weather api
  getWeatherAPI() : string{
    
    return environment.apiKeys.weatherAPI;

  }
// Gets the newsa api
  getNewsAPI() : string {
 
     return environment.apiKeys.newsAPI;

  }
}
