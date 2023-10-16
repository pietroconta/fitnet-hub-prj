import { Injectable } from '@angular/core';
import { User } from './classes';

@Injectable({
  providedIn: 'root'
})
export class LsManagerService {



  constructor() {

  }



  cacheObj(users: any, name: string, time?: number) {
    const dataToCache = {
      user: users,
      EXP_TIME: time ? time : undefined
    };
  
    let strObj = JSON.stringify(dataToCache);
  
    // Visualizza la stringa JSON prima di memorizzarla
    console.log(strObj);
  
    localStorage.setItem(name, strObj);
  }


  getObj() { }

  updateCache() { //questa procedura controlla se gli elementi nel local storage sono scaduti e li elimina in quel caso

    let keys: string[] = Object.keys(localStorage);
    let keysLgt = keys.length;
    while (keysLgt--) {
      let item = localStorage.getItem(keys[keysLgt])
      console.log(item);
    }
  }





  /*cacheUsers(users:User[]){
    localStorage.setItem("cachedUsers", JSON.stringify(users));
  }*/
}
