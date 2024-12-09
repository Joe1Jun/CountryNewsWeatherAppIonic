import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  constructor(private storage : Storage ) { }


  async setItem(key : string, value:any){
    await this.storage.set(key,value);
  }

  async getItem(key : string){
    await this.storage.get(key);
  }

  async removeItem(key:string){
    await this.storage.remove(key);
  }
}
