import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { register } from 'swiper/element/bundle';
import { Trainer } from './classes';
import { LsManagerService } from './ls-manager.service';
import { User } from './classes';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private usrService: AuthService, lsManager:LsManagerService) {
    console.log(lsManager.updateCache());
    var supCont = this;
   /* if (!usrService.isLogged()) {
      
      this.router.navigate(["slide-screen"]);
    } else usrService.getLoggedUser() instanceof Trainer ?
       this.router.navigate(["t-tabs"]) : 
       this.router.navigate(["user-dashboard"]);
    */

       /*
    var ac = this;
    usrService.isLogged().subscribe({
      next(response:any) {
        if(response.result == "success"){
          ac.router.navigate(["user-dashboard"]);
        }else{
          ac.router.navigate(["slide-screen"]);
        }
        
       
      },
    })*/
      //
      //send post on /validate endpoint to verify token
      this.usrService.isLogged().subscribe({
        next(response:any) {
            
          if(response.status == "success"){
            console.log(response.type);
            if(response.type == "t"){
              supCont.usrService.setLoggedUser(new User(response.id));
              supCont.router.navigate(["t-tabs"]);
            }else{
              supCont.router.navigate(["user-dashboard"]);
            }
          }
        },
        error(err) {
          supCont.router.navigate(["slide-screen"]);
          console.log(err);
        }
      })

     



  }

}
