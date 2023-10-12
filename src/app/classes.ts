import { IonDatetime } from "@ionic/angular";

export class User{
    constructor(private name:string, private surname:string,
        private birthdate:any, private email:string, private username:string, private id:string) {
    }

    getId(){
        return this.id;
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

export class Trainer extends User{
    constructor(
        name: string,
        surname: string,
        birthdate: any,
        email: string,
        username: string,
        id: string
    ) {
        super(name, surname, birthdate, email, username, id);
        
    }
    
    
}

export interface CardData{
    username: string;
    imgUri: string;
    id: string;
}