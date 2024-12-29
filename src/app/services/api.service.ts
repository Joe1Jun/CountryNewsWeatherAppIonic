import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }


  getWeatherAPI() : string{
    
    return environment.apiKeys.weatherAPI;

  }

  getNewsAPI() : string {
 
     return environment.apiKeys.newsAPI;

  }
}
