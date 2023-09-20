import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './classes';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static url: string = "http://www.fitnet-api.it";
  //jwt nel ls, se c'è ed è valido si è loggati
  private user: any;

  constructor(public http: HttpClient) {
    this.user = null;
  }


  setUser(user:User){
    this.user = user;
  }


  isLogged() {
    //todo
    if (this.user instanceof User) {
      return true;
    } else return false;
  }

  getInfo() {
    localStorage.getItem("jwt");
  }

  login(email: string, psw: string, type: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     return this.http.post(UserService.url + "/login", {
      "email": email,
      "psw": psw,
      "type": type
    }, httpOptions);
  }

  signin(email: string, psw: string, birthdate: string, surname: string, name: string,
    username: string,) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(UserService.url + "/signin", {
      "email": email,
      "psw": psw,
      "birthdate": birthdate,
      "surname": surname,
      "username": username,
      "name": name,
    }, httpOptions);
  }

}
