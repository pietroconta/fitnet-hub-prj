import { Injectable } from '@angular/core';
import { User } from './classes';
import { ParseError } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LsManagerService {



  constructor() {

  }



  cacheObj(users: any, key: string, time?: number) {
    const dataToCache = {
      user: users,
      EXP_TIME: time ? time : undefined,
      SVG_DATE: Date.now()
    };

    let strObj = JSON.stringify(dataToCache);

    // Visualizza la stringa JSON prima di memorizzarla
    console.log(strObj);

    localStorage.setItem("CACHE_" + key, strObj);
  }


  getObj() { }

  updateCache() { //questa procedura controlla se gli elementi nel local storage sono scaduti e li elimina in quel caso

    try {
      let keys: string[] = Object.keys(localStorage);
      let keysLgt = keys.length;
     
      while (keysLgt--) {
        //console.log(keys[keysLgt].substring(0, 5));
        if (keys[keysLgt].substring(0, 5) == "CACHE") {
          let item = localStorage.getItem(keys[keysLgt]);
          let itemJSON = JSON.parse(item ? item : "");
          
          if(itemJSON.SVG_DATE + itemJSON.EXP_TIME <= Date.now()){
            localStorage.removeItem(keys[keysLgt]);
            console.log("REMOVED ITEM n." + keysLgt, itemJSON);
          }
          
        }

      }
    }catch(e:any){
      console.log(e);
    }
  }





  /*cacheUsers(users:User[]){
    localStorage.setItem("cachedUsers", JSON.stringify(users));
  }*/
}
