import { Injectable } from '@angular/core';
import { User } from './classes';

@Injectable({
  providedIn: 'root'
})
export class LsManagerService {

  

  constructor() { 
    enum expType  {
      startup,
      time

    };
  }



  cacheArrObj(){}

  /*cacheUsers(users:User[]){
    localStorage.setItem("cachedUsers", JSON.stringify(users));
  }*/
}
