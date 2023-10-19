import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { register } from 'swiper/element/bundle';
import { Trainer } from './classes';
import { LsManagerService } from './ls-manager.service';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private usrService: AuthService, lsManager:LsManagerService) {
    console.log(lsManager.updateCache());
    if (!usrService.isLogged()) {
      
      this.router.navigate(["slide-screen"]);
    } else usrService.getLoggedUser() instanceof Trainer ?
       this.router.navigate(["home"]) : 
       this.router.navigate(["user-dashboard"]);
    



  }

}
