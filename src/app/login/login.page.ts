import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../classes';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;
  logged:boolean;

  constructor(private uService: UserService, public formBuilder: FormBuilder) {
    this.logged = false;
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
    });
  }

  ngOnInit() {

  }

  login() {
    if (this.ionicForm.valid) {
      const formValues = this.ionicForm.getRawValue();
      let type = formValues["type"];
      this.uService.login(formValues["email"], formValues["password"], type).subscribe({
        next: (response:any) => {
          console.log(response);
          if(response.result == "success"){
            this.logged = true;
            if(type == "u"){
              this.uService.setUser(new User(response.user.usn_name, 
                response.user.usn_surname, response.user.usn_birthdate, 
                response.user.usn_email, response.user.usn_username, response.user.usn_id));

                console.log("isLogged?", this.uService.isLogged());
            }else{

            }
          }
        },
        error: (e) => console.error(e)
      })


    } else {
      console.log("err", this.ionicForm.controls);
    }
    console.log("login");
  }
}