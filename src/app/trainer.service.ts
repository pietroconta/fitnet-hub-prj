import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient  } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private authServ:AuthService) { 
    console.log(this.authServ.isLogged());
  }
  
  getSubscribers(){

  }

  addSubscriber(id:string)/*from request*/{
    
  }

  addSheetTemplate(){}

  getSheetsTemplate(id:string){}


  

}
