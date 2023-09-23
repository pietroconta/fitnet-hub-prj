import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  ionicForm: FormGroup;
  public isSigned: boolean;
  constructor(public formBuilder: FormBuilder, private router: Router, private uServ: UserService) {
    this.isSigned = false;
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
      name:['', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
      surname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(19)]],
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
      birthdate: ['', [Validators.required, this.validateBirthdate]], // Aggiungi la validazione custom
      passwordConfirm: ['', [Validators.required, Validators.minLength(2)]],
      type: ['', Validators.required]
    });
    const birthdateControl = this.ionicForm.get('birthdate');
    if (birthdateControl) {
      birthdateControl.setErrors({ 'under16': true });
    }
  }

  validateBirthdate(control: AbstractControl): { [key: string]: boolean } | null {
    const birthdate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    if (age < 16) {
      return { 'under16': true };
    }

    return null;
  }

  ngOnInit() {
  }

  signin() {
    const formValues = this.ionicForm.getRawValue();
    if (this.ionicForm.valid && (formValues["email"] === formValues["emailConfirm"] && formValues["password"] === formValues["passwordConfirm"])) {
      let ms = new Date(formValues["birthdate"]).getTime();
      console.log("ms", ms);
      this.uServ.signin(formValues["email"], formValues["password"], ms + '', formValues["surname"], formValues["name"],
        formValues["username"], formValues["type"]).subscribe({
          next: (response: any) => {
            console.log(response);
            if (response.result == "success") {
              this.isSigned = true;
              this.router.navigate(["login"]);
            }
          },


          error: (error: any) => { console.log(error); }
        })
    }
  }

  goToLogin() {
    this.router.navigate(["login"]);
  }

}
