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
//This item will an retrieve the item from storage.
  async getItem(key : string) : Promise<string> {
    
    return await this._storage.get(key) || null;
   
  }
// This removes an item from storage
  async removeItem(key:string){
    await this._storage.remove(key);
  }

  // This saves an item to a storage array
  // This is abstracted as the identifier is any meaning this can be used for multiple items being stored
  async saveItemToArray(key: string, identifier : any) {
    //  Retrieve the current weather locations array
    const currentArray = await this.getArray(key);
    console.log('Current storage array' , currentArray);
  
    //  Add the new location data
    currentArray.push(identifier);
  
    //  Save the updated array back to storage
    await this._storage.set(key, JSON.stringify(currentArray));
    console.log('Item saved');
  }
  
  // Gets the item from the storage array 
  async getArray(key: string): Promise<any[]> {
    //  Retrieve the array from storage or return an empty array if not found
    const data = await this._storage.get(key);
   // If 'data' exists (is truthy), parse it from JSON format and return the parsed object;
// otherwise, return an empty array as a default value.
    return data ? JSON.parse(data) : [];
  }
  
  //Removes an item from an array 
  async removeItemFromArray(key : string , id : number){

    try {
      console.log(id)
      const removeArray = await this.getArray(key);
      console.log("This is th array before item removed " , removeArray);
      for (let i = 0; i < removeArray.length; i++) {
        //Make sure there are === here otherwise ther might be an issue with typecasting 
        if (removeArray[i].id === id) {
          //  Remove the item using splice if it matches
          removeArray.splice(i, 1); // Removes the item at index i
          console.log("removed from the array");
          // S Save the updated array back to storage
          await this._storage.set(key, JSON.stringify(removeArray));
          // Exit after removing the item
          console.log(this.getArray(key))
         
        }else{
          console.log("Items not found")
        }
    
    
      }
    
    
    } catch (error) {
      
     console.log("Error deleting item", error)



    }

   
    

  }

  }
