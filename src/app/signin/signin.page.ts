import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  ionicForm: FormGroup;
  constructor(public formBuilder: FormBuilder, private router:Router) { 
    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      emailConfirm: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      passwordConfirm: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  signin(){
    const formValues = this.ionicForm.getRawValue();
    if(this.ionicForm.valid && (formValues["email"] === formValues["emailConfirm"] && formValues["password"] === formValues["passwordConfirm"])){

      console.log("isValidForm", true);
      
    }
  }

  goToLogin(){
    this.router.navigate(["login"]);
  }

}
