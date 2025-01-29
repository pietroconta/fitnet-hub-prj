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
  
  getSubscribers(limit:number = 0, offset:number = 0){
    return this.http.get(environment.url + "api/trainers/" + this.authServ.getLoggedUser().getId()
     + "/subscriptions?offset=" + offset +"&limit=" + limit);
  } 

  addSubscriber(id:string)/*from request*/{
    
  }

  addSheetTemplate(){}

  getSheetsTemplate(id:string){}


  getUserSheet($id:string){

    return this.http.get(environment.url + "/users/" + $id + "/sheet")
  }

  

}
