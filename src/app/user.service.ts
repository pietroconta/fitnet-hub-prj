import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { 

    
  }

  getUser(id:String){
    return this.httpClient.get(environment.url + "/users/" + id);
  }
}
