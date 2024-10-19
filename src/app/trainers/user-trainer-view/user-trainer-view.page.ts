import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, USheet, rep, SheetDay,SheetSeries, DayOfWeek, ExercisesType} from 'src/app/classes';
import { LsManagerService } from 'src/app/ls-manager.service';
import { TrainerService } from 'src/app/trainer.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-trainer-view',
  templateUrl: './user-trainer-view.page.html',
  styleUrls: ['./user-trainer-view.page.scss'],
})
export class UserTrainerViewPage implements OnInit {

  public user!: User;
  public imgUri!: string;
  public year!: number;
  public uSheet!:USheet;

  constructor(private lsM: LsManagerService, router: Router, private userServ: UserService, private trainServ:TrainerService) {
    
   
    let today = new Date();
    let self = this;
    let pathId = router.url.split("/")[4];

    let userReq = userServ.getUser(pathId);
    userReq.subscribe({
      next(response: any){
        console.log(response);
        self.user = new User(response[0].usn_name, response[0].usn_surname, response[0].usn_birthdate, response[0].usn_email,
          response[0].usn_username, response[0].usn_id, response[0].usn_img);
      },

      error(err) {
          
      }
    })
    /*
    let subscribers = lsM.getObj("subscribers");
   
    // console.log("sub Lenght", subscribers.data.content.length);

    console.log(subscribers);


    if (!subscribers.data.item || !this.findAndSetUser(subscribers, pathId)) {//make api call for get missing data and set on local storage
      userServ.getUser(pathId).subscribe({
        next(response: any) {

          self.user = new User(response[0].usn_name, response[0].usn_surname, response[0].usn_birthdate, response[0].usn_email,
            response[0].usn_username, response[0].usn_id, response[0].usn_img);

          let userArray: any[] = [];
          if (subscribers.data.item) {
            userArray = subscribers.data.content;
            userArray[subscribers.data.content.length] = response[0];
          } else {
            userArray[0] = response[0];
          }
          lsM.cacheObj({ objs: userArray, key: "subscribers", time: 20000, sign: true });

          console.log(response);
        },
        error(err) {

        }
      });
    }



    if (this.user.getImg() == "default" || this.user.getImg() == null) {
      this.imgUri = "../assets/images/slider/person-circle-outline.svg";
    } else {
      this.imgUri = this.user.getImg();
    }

    let birthdate = new Date(this.user.getBirthdate());
    this.year = today.getFullYear() - birthdate.getFullYear();
    if (
      today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
      this.year--;
      console.log("not passed bday");
    }
  

    this.setSheet();
    */
    // let user = lsM.getObj(router.url.split("/")[4]);
    //user:User = new User();
  }

   getSheetFromJson(jsonData: any): USheet {
    const sheetDays: SheetDay[] = [];
  
    if (jsonData && jsonData.sheets) {
      for (const sheetData of jsonData.sheets) {
        const dayOfWeekStr: string = sheetData.exercises_template.et_day;
        
        // Explicitly cast the string to DayOfWeek
        const dayOfWeek: DayOfWeek = DayOfWeek[dayOfWeekStr as keyof typeof DayOfWeek];
  
        const sheetSeriesData: any[] = jsonData.sheets.filter((sheet: any) => sheet.exercises_template.et_day === dayOfWeekStr);
        const sheetSeries: SheetSeries[] = sheetSeriesData.map((seriesData: any) => {
          // Check if 'exercises' is an array before using 'map'
          const exercisesArray = Array.isArray(seriesData.exercises) ? seriesData.exercises : [];
          
          const repData: any[] = exercisesArray.map((exercise: any) => {
            const exercisesType = new ExercisesType(
              exercise.et_exe_id,
              exercise.exe_name,
              exercise.exe_desc,
              exercise.exe_type
            );
            return new rep(exercisesType, seriesData.sc_exe_weight);
          });
        
          return new SheetSeries(repData);
        });
        
  
        const sheetDay = new SheetDay(sheetSeries, dayOfWeek);
        sheetDays.push(sheetDay);
      }
    }
  
    return new USheet(sheetDays);
  }

  setSheet(){
    const self = this;
    this.trainServ.getUserSheet(this.user.getId()).subscribe({
      next(response:any){

        self.uSheet = self.getSheetFromJson(response);
        console.log("usheet: ", response);
        self.logUSheet();
      },
      error(err:any){

      }
    })
    
  }


findAndSetUser(subscribers: any, pathId: any) {
  let hasFound = false;
  subscribers.data.content.forEach((el: any) => {
    if (el.usn_id == pathId) {
      this.user = new User(el.usn_name, el.usn_surname, el.usn_birthdate, el.usn_email,
        el.usn_username, el.usn_id, undefined, el.usn_height, el.usn_weight);
      hasFound = true;
    }
  });

  return hasFound;
}

setUser(user: any) {

  this.user = new User(user.usn_name, user.usn_surname, user.usn_birthdate, user.usn_email,
    user.usn_username, user.usn_id, undefined,user.usn_height, user.usn_weight);

}

logUSheet() {
  this.uSheet.$sheetDays.forEach((sD: SheetDay) => {
    console.log(`Day of week: ${DayOfWeek[sD.$dayOfWeek]}`);
    
    sD.$sheetSeries.forEach((sS: SheetSeries) => {
      sS.$reps.forEach((r: rep) => {
        console.log(`  Exercise Type: ${r.$exercisesType.$title}`);
        console.log(`  Weight: ${r.$weight}`);
      });
    });
  });
}


ngOnInit() {

}

}


