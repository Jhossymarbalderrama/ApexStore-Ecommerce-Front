import { Component } from '@angular/core';
import { FormGroup , FormBuilder, Validator, Validators} from '@angular/forms';
import { LoginRequest } from 'src/app/interfaces/loginRequest';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // * ATRIBUTOS
  formRegister: FormGroup = this.FormBuilder.group({
  'username': ['',Validators.required],
  'password': ['',Validators.required],
  'confirmPassword': ['',Validators.required],
  })

  registerState: boolean = false;

  // * GETTERs and SETTERs
  get username(){
    return this.formRegister.controls['username'];
  }
  
  get password(){
    return this.formRegister.controls['password'];
  }

  get confirmPassword(){
    return this.formRegister.controls['confirmPassword'];
  }

  // * CONSTRUCTOR
  constructor(
    private FormBuilder : FormBuilder,
    private LoginService: LoginService
    ){
  }

  // * METHODs
  //#region 
  
  onRegister(){
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched();
    }else{         
      let username = this.username.value;
      let password = this.password.value;
      let confPassword = this.confirmPassword.value;

      if(password == confPassword){                
        this.LoginService.svRegister({
          username:username,
          password: password
        } as LoginRequest).subscribe(
          {
            next: (response) => {
              console.info(response);
              this.registerState = true;
              this.formRegister.reset();
            },
            error: (errorData) => {
              console.error(errorData);            
            }
          }
        );
      }
    }
  }
  //#endregion
}
