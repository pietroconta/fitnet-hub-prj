import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trainer, User } from './classes';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //jwt nel ls, se c'è ed è valido si è loggati
  private user: any;
  private token: string;

  constructor(public http: HttpClient) {
    this.user = null;
    this.token = "";
  }

 /* setLoginSession(user: User, token: string, type: string) {
    const userData = {
      user: user,
      type: type
    };

    const userDataString = JSON.stringify(userData);
    localStorage.setItem("logged_user", userDataString);
    localStorage.setItem("token", token);

    //todo: aggiungere marca temporale e firma crittografica
    const sign = btoa(decodeURIComponent(encodeURIComponent(userDataString + environment.lsKey)));
    localStorage.setItem("sign", sign);

  }*/

    setLoginSession(){
      
    }

  logout() {
    this.user = null;
    localStorage.clear();
  }

  getLoggedUser(){
    return this.user;
  }


  isLogged() {
    //todo
    const storedUserDataString = localStorage.getItem("logged_user");
    const storedFirmaCritto = localStorage.getItem("sign");

    if (storedUserDataString !== null) {
      const userJSON = JSON.parse(storedUserDataString);
      const userData = JSON.stringify(userJSON);
      const sign = btoa(decodeURIComponent(encodeURIComponent(userData + environment.lsKey)));

      // Verifica se le firme corrispondono
      if (sign === storedFirmaCritto) {
        if(JSON.parse(storedUserDataString).type === "u"){
          this.user = new User(userJSON.user.name, userJSON.user.surname,
            userJSON.user.birthdate, userJSON.user.email, userJSON.user.username, userJSON.user.id);
        }else{
          this.user = new Trainer(userJSON.user.name, userJSON.user.surname,
            userJSON.user.birthdate, userJSON.user.email, userJSON.user.username, userJSON.user.id);
        }
        console.log("userID", userJSON.user.id);
        return true;
      }else{
        this.logout();
      }
    }
    return false;

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
    return this.http.post(environment.url + "login", {
      "email": email,
      "psw": psw,
      "type": type
    }, httpOptions);
  }

  signin(email: string, psw: string, birthdate: string, surname: string, name: string,
    username: string, type: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log( {
      "email": email,
      "psw": psw,
      "birthdate": birthdate,
      "surname": surname,
      "name": name,
      "username": username,
      "type": type
    });
    return this.http.post(environment.url + "signin", {
      "email": email,
      "psw": psw,
      "birthdate": birthdate,
      "surname": surname,
      "name": name,
      "username": username,
      "type": type
    }, httpOptions);
  }

}
