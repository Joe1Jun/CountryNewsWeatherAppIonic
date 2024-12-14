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

  async saveWeatherLocation(key: string, location: any) {
    //  Retrieve the current weather locations array
    const weatherArray = await this.getArray(key);
    console.log('Current weather locations:', weatherArray);
  
    //  Add the new location data
    weatherArray.push(location);
  
    //  Save the updated array back to storage
    await this.storage.set(key, JSON.stringify(weatherArray));
    console.log('Weather location saved');
  }
  
  async getArray(key: string): Promise<any[]> {
    //  Retrieve the array from storage or return an empty array if not found
    const data = await this.storage.get(key);
    return data ? JSON.parse(data) : [];
  }
  
  async removeItemFromArray(key : string, name : string){

    const removeArray = await this.getArray(key);

    for (let i = 0; i < removeArray.length; i++) {
      if (removeArray[i].name === name) {
        //  Remove the item using splice if it matches
        removeArray.splice(i, 1); // Removes the item at index i
        console.log(`${name} removed from the array.`);
        // S Save the updated array back to storage
        await this.storage.set(key, JSON.stringify(removeArray));
        // Exit after removing the item
        console.log(this.getArray(key))
        return; 
      }
    

  }

  }
}