import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  logging: boolean;

  constructor(private router: Router, private uService: AuthService, public formBuilder: FormBuilder) {
    this.logging = false;
    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),

        ],
      ],
      type: ['', Validators.required]
    }

    );
  }

  ngOnInit() {

  }

  login() {
    if (this.ionicForm.valid) {
      const formValues = this.ionicForm.getRawValue();
      let type = formValues["type"];
      this.logging = true;
      this.uService.login(formValues["email"], formValues["password"], type).subscribe({
        next: (response: any) => {
          this.logging = false;
          console.log(response);
          if (response.result == "success") {
            
            if(response.user.type == "t"){
              this.router.navigate(["t-tabs"]);
            }else{
              this.router.navigate(["user-dashboard"]);
            }

            //  console.log("isLogged?", this.uService.isLogged());
            /*
            if (type === "u") {
              this.uService.setLoginSession(new User(response.user.usn_name,
                response.user.usn_surname, response.user.usn_birthdate,
                response.user.usn_email, response.user.usn_username, response.user.usn_id), response.token, type);
              this.router.navigate(["user-dashboard"]);
            } else {
              this.uService.setLoginSession(new User(response.user.trn_name,
                response.user.trn_surname, response.user.trn_birthdate,
                response.user.trn_email, response.user.trn_username, response.user.trn_id), response.token, type);
              this.router.navigate(["home"]);
            }*/

          }

        },
        error: (e) => {
          this.logging = false;
          console.error(e)
        }
      })


    } else {
      console.log("err", this.ionicForm.controls);
    }
    console.log("login");
  }

  goToSignIn() {
    this.router.navigate(["signin"]);
  }
}