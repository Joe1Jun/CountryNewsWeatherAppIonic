import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '@capacitor/core';
import { CapacitorHttp } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class MyHttpServiceService {


  

  constructor() { }
// This function uses Capacitor's CapacitorHttp plugin to make an HTTP GET request.
// It accepts an 'options' object containing the necessary parameters e.g. URL headers etc. for the request.
  async get (options : HttpOptions){
    return await CapacitorHttp.get(options);
  }


  

}
