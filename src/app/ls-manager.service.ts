import { Injectable } from '@angular/core';
import { User } from './classes';

@Injectable({
  providedIn: 'root'
})
export class LsManagerService {



  constructor() {

  }



  cacheObj(obj: object, name: string, time?: bigint) {
    let strObj: any = JSON.stringify(obj);
    if (time) {
      strObj.EXP_TIME = time;
    }
    
    localStorage.setItem(name, strObj);

  }


  getObj(){}

  updateCache(){ //questa procedura controlla se gli elementi nel local storage sono scaduti e li elimina in quel caso

   let keys:string[] = Object.keys(localStorage);
   let keysLgt = keys.length;
   while(keysLgt--){
    let item = localStorage.getItem(keys[keysLgt])
    console.log(item);
   }
  }





  /*cacheUsers(users:User[]){
    localStorage.setItem("cachedUsers", JSON.stringify(users));
  }*/
}
