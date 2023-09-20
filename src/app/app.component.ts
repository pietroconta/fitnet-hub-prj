import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user-service.service';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router, private usrService:UserService) {
    if(!usrService.isLogged()){
     this.router.navigate(["slide-screen"]);
    }/*else if(trnService.isLogged()){this.router.navigate(["/trainerHome"]);}*/


  }
  
}
