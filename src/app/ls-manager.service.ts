import { Injectable } from '@angular/core';
import { User } from './classes';
import { ParseError } from '@angular/compiler';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LsManagerService {



  constructor() {

  }



  //Inserisce nel ls un oggetto o un array di oggetti, la chiave sarà "CACHE_" + la chiave passata
  //se si inserisce anche il tempo, l'oggetto nel ls avrà una data di scadenza
  //se si inserisce sign, l'oggetto nel ls sarà protetto da modifiche da parte dell'utente
  cacheObj({ objs, key, time, sign }: { objs: any; key: string; time?: number; sign?: boolean }) {
 //   if (!localStorage.getItem("CACHE_" + key)) {

      const data = {
        content: objs,
        item: true,
        EXP_TIME: time ? time : undefined,
        SVG_DATE: Date.now(),
      }
      const dataToCache = {
        data: data,
        SIGN: sign ? btoa(decodeURIComponent(encodeURIComponent(JSON.stringify(data) + environment.lsKey))) : false

      };

      let strObj = JSON.stringify(dataToCache);

      // Visualizza la stringa JSON prima di memorizzarla
      //console.log(strObj);

      localStorage.setItem("CACHE_" + key, strObj);
      /*else {
      console.log("already setted");
    }*/
    } 
  


  

  getObj(key: string) {
    let item = localStorage.getItem("CACHE_" + key);
   // console.log(item);
    return JSON.parse(item ? item : '{"data": {"item":false}}');
  }

  updateCache() { //questa procedura controlla se gli elementi nel local storage sono scaduti e li elimina in quel caso

    try {
      let keys: string[] = Object.keys(localStorage);
      let keysLgt = keys.length;
      let result = "noaction";
      while (keysLgt--) {
        //console.log(keys[keysLgt].substring(0, 5));
        if (keys[keysLgt].substring(0, 5) == "CACHE") {
          let item = localStorage.getItem(keys[keysLgt]);
          let itemJSON = JSON.parse(item ? item : "");
         
          let newSign = (btoa(decodeURIComponent(encodeURIComponent(JSON.stringify(JSON.parse(item ? item : "").data) + environment.lsKey))));
          if ((itemJSON.data.SVG_DATE + itemJSON.data.EXP_TIME <= Date.now())) {
            localStorage.removeItem(keys[keysLgt]);
            result = "REMOVED ITEM n." + keysLgt + " for expired data";

          }
          else if ((itemJSON.SIGN != "") && newSign != itemJSON.SIGN) {
            localStorage.removeItem(keys[keysLgt]);
            /* console.log("REMOVED ITEM n." + keysLgt + " for  local data manipulation:\n Retrieved sign" + 
             newSign + "(" + JSON.parse(item ? item : "").data + ") old sign: " + itemJSON.SIGN, itemJSON);*/

            result = "REMOVED ITEM n." + keysLgt + " for  local data manipulation. Retrieved sign" +
              newSign + "(" + JSON.parse(item ? item : "").data + ") old sign: " + itemJSON.SIGN, itemJSON;

          }

          
          return {
            result: result,
            obj: itemJSON
          };

        }

      }

      return {result: result};
    } catch (e: any) {
      console.log(e);
      return {result: e};
    }
  }





  /*cacheUsers(users:User[]){
    localStorage.setItem("cachedUsers", JSON.stringify(users));
  }*/
}
