import { IonDatetime } from "@ionic/angular";

export class User{
    constructor(private id:string, private name?:string, private surname?:string,
        private birthdate?:any, private email?:string, private username?:string,
        private imgUri?:any, private height?:any, private weight?:any) {
    }

    getId(){
        return this.id;
    }

    getImg(){
        return this.imgUri;
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

    getWeight(){
        return this.weight;
    }

    getHeight(){
        return this.height;
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



//<user sheet classes>

export class USheet {
    private sheetDays:SheetDay[];
    constructor(sheetDays:SheetDay[]) {
        this.sheetDays = sheetDays;
    }

    public get $sheetDays():SheetDay[]{
        return this.sheetDays;
    }


}

export enum DayOfWeek{
    LUN,
    MAR,
    MER,
    GIO,
    VEN,
    SAB,
    DOM
}

export class SheetDay {
   
    private dayOfWeek:DayOfWeek;
    private sheetSeries:SheetSeries[];
    constructor(sheetSeries:SheetSeries[], dayOfWeek:DayOfWeek) {
        this.dayOfWeek = dayOfWeek;
        this.sheetSeries = sheetSeries;
    }

    /**
     * Getter $dayOfWeek
     * @return {DayOfWeek}
     */
	public get $dayOfWeek(): DayOfWeek {
		return this.dayOfWeek;
	}

    
    public get $sheetSeries(): SheetSeries[] {
		return this.sheetSeries;
	}
    
}

export class SheetSeries {
    private reps:rep[];
    constructor(reps:rep[]) {
        this.reps = reps;
    }


    /**
     * Getter $reps
     * @return {rep[]}
     */
	public get $reps(): rep[] {
		return this.reps;
	}
    
}

export class rep {
    private exercisesType:ExercisesType;
    private weight:number;
    constructor(exercisesType:ExercisesType, weight:number) {
        this.exercisesType = exercisesType;
        this.weight = weight;
    }


    /**
     * Getter $exercisesType
     * @return {ExercisesType}
     */
	public get $exercisesType(): ExercisesType {
		return this.exercisesType;
	}


    /**
     * Getter $weight
     * @return {number}
     */
	public get $weight(): number {
		return this.weight;
	}
   
    
}

export class ExercisesType {
    private id:string;
    private title:string;
    private description:string;
    private imgUri:string;
    constructor(id:string, title:string, description:string, imgUri:string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUri = imgUri;
    }
    /**
     * Getter $title
     * @return {string}
     */
	public get $title(): string {
		return this.title;
	}

    /**
     * Getter $description
     * @return {string}
     */
	public get $description(): string {
		return this.description;
	}

    /**
     * Getter $imgUri
     * @return {string}
     */
	public get $imgUri(): string {
		return this.imgUri;
	}

    /**
     * Getter $id
     * @return {string}
     */
	public get $id(): string {
		return this.id;
	}

}

//</user sheet classes>