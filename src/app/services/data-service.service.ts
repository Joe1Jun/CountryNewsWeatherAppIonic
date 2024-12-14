import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  //This stoage variable is used to store the initialized instance of storage after calling the create method
 private _storage! :Storage 

  constructor(private storage : Storage ) { 
    //cannot use this method in the constructor as it is an async method
    this.init();
  }
//private method to initialise the storage object
  private async init(){
    //Before create the storage instance doesnt have a configured driver so calling the methods would fail
    const storage = await this.storage.create();
    //After create the storage variable hold the intialised driver instance so methods can be called.
    this._storage = storage;
    console.log('Storage initialized with driver:', this._storage.driver);
  }

  //This method will set the item in storage as a key value pair
  //This will be used for settings that have one key value pir
  async setItem(key : string, value:any){
    await this._storage.set(key, value);
    console.log(value + ' set successfully!');
  }
//This item will retrieve the item from storage.
  async getItem(key : string) : Promise<string> {
    return await this.storage.get(key);
    
  }

  async removeItem(key:string){
    await this.storage.remove(key);
  }

  async saveItemToArray (key : string, item : any){
     
    

  }


  async getArray (key : string ) : Promise<string>{
    

    return " "
  }

  async removeItemFromArray(){


  }




  
}
