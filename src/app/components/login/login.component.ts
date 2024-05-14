import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/enums/Role';
import { LoginService } from 'src/app/services/login.service';
import { LoginRequest } from 'src/app/interfaces/loginRequest';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // * ATRIBUTOS
  loginError: string | undefined;
  showOverlay: boolean = false; // ? Spinner Loading

  formLogin: FormGroup = this.FormBuilder.group({
    'username': ['jhossy@gmail.com',[ Validators.required, Validators.email]],
    'password': ['jhossy', Validators.required]
  });

  // * GETTERs and SETTERs
  get username() {
    return this.formLogin.controls['username'];
  }

  get password() {
    return this.formLogin.controls['password'];
  }

  // * CONSTRUCTOR
  constructor(
    private FormBuilder: FormBuilder,
    private LoginService: LoginService,
    private Router: Router,
    private ProductService: ProductService,
    private AuthService: AuthService,
    private ToastService: ToastService
  ) {
    if (!this.ProductService.listProducts) {
      this.ProductService.svListProducts().subscribe();
    }
  }

  ngOnInit() { }

  // * METHODs
  //#region 

  onLogin() {
    if (this.formLogin.valid) {
      this.loginError = "";
      this.ToastService.showOverlay = true;
      this.LoginService.svLogin(this.formLogin.value as LoginRequest).subscribe({
        next: (userData) => {
          //Trae el Token
          // console.log("Logeado: ",userData);                     
        },
        error: (errorData) => {
          this.loginError = errorData;
          this.ToastService.showOverlay = false;
        },
        complete: () => {          
          setTimeout(() => {
            this.formLogin.reset();
            this.Router.navigateByUrl('/dashboard/profile');
            this.ToastService.showOverlay = false;
          }, 1000);
        }
      });      
    } else {
      this.formLogin.markAllAsTouched();
    }
  }
  //#endregion

}
