import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { register } from 'swiper/element/bundle';
import { Trainer } from './classes';
import { LsManagerService } from './ls-manager.service';
import { User } from './classes';
import { of } from 'rxjs';
import { catchError, Observable } from 'rxjs';
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
   
      //send post on /validate endpoint to verify token and try to refresh if got 401
      this.usrService.isLogged().pipe(
        catchError(err => {
          console.log("Errore in isLogged(), provo refresh()", err);
          return this.refreshSession();
        })
      ).subscribe(response => {
        if (response && response.status === "success") {
          if (response.type === "t") {
            this.usrService.setLoggedUser(new User(response.id));
            this.router.navigate(["t-tabs"]);
          } else {
            this.router.navigate(["user-dashboard"]);
          }
        }
      });
  }

  private refreshSession(): Observable<any> {
    return this.usrService.refresh().pipe(
      catchError(err => {
        console.log("Refresh fallito, reindirizzo a slide-screen", err);
        this.router.navigate(["slide-screen"]);
        return of(null);
      })
    );
  }

}
