import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './classes';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static url: string = "http://www.fitnet-api.it";
  //jwt nel ls, se c'è ed è valido si è loggati
  constructor(public http: HttpClient, private loggedUser: User) {

  }

  isLogged() {
    //todo
    return false;
  }

  getInfo(){
    localStorage.getItem("jwt");
  }

  login(email: string, psw: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "usn_email": email,
        "usn_psw": psw
      })
    };
    return this.http.post(UserService.url + "/login", {
      "usn_email": email,
      "usn_psw": psw
    }, httpOptions);
  }

  signin(email: string, psw: string, birthdate: string, surname: string, name: string,
    username: string, ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(UserService.url + "/signin", {
      "usn_email": email,
      "usn_psw": psw,
      "usn_birthdate": birthdate,
      "usn_surname": surname,
      "usn_username": username,
      "usn_name": name,
    }, httpOptions);
  }

}
