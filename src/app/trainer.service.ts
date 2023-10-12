import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TrainerService {


  constructor(private authServ:AuthService, private http:HttpClient) { 
    console.log(this.authServ.isLogged());
  }
  
  getSubscribers(){
    return this.http.get(environment.url + "/trainers/" + this.authServ.getLoggedUser().getId() + "/subscriptions");
  }

  addSubscriber(id:string)/*from request*/{
    
  }

  addSheetTemplate(){}

  getSheetsTemplate(id:string){}


  

}
