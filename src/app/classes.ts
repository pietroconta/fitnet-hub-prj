import { IonDatetime } from "@ionic/angular";

export class User{
    constructor(private name:string, private surname:string,
        private birthdate:any, private email:string, private username:string) {
        
    }

    getName(){
        return this.name;
    }
    getSurname(){
        return this.surname;
    }

    getBirthdate(){
        return this.birthdate;
    }

    getEmail(){
        return this.email;
    }

    getUsername(){
        return this.username;
    }
}