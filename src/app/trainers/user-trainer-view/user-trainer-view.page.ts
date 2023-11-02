import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes';
import { LsManagerService } from 'src/app/ls-manager.service';

@Component({
  selector: 'app-user-trainer-view',
  templateUrl: './user-trainer-view.page.html',
  styleUrls: ['./user-trainer-view.page.scss'],
})
export class UserTrainerViewPage implements OnInit {

  public user!:User;
  
  constructor(private lsM:LsManagerService, router:Router) {
    let pathId = router.url.split("/")[4];
    let subscribers = lsM.getObj("subscribers");
    subscribers.data.content.forEach((el:any)=> {
      if(el.usn_id == pathId){
        this.user = new User(el.usn_name, el.usn_surname, el.usn_birthdate, el.usn_email,
        el.usn_username, el.usn_id);
      }
    });
    
   // let user = lsM.getObj(router.url.split("/")[4]);
    //user:User = new User();
   }
          
  ngOnInit() {

  }

}
