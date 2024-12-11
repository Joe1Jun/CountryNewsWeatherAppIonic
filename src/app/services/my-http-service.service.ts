import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '@capacitor/core';
import { CapacitorHttp } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class MyHttpServiceService {


  

  constructor() { }

  async get (options : HttpOptions){
    return await CapacitorHttp.get(options);
  }


  

}
