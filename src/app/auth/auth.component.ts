import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../Interfaces/authresponse';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin = true
  isLoading = false
  error = null

  authForm = new FormGroup({
    email: new FormControl('' , [Validators.required]),
    password: new FormControl('' , Validators.required)
  })

  constructor(private authService:AuthService , private router:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLogin = !this.isLogin;

  }

  authSubmit(){
    const email = this.authForm.controls.email.value || '';
    const password =this.authForm.controls.password.value || '';
    let authObs : Observable<AuthResponseData>

    if (this.isLogin) {
      this.isLoading = true
      authObs = this.authService.login(email,password)

    }else{
      this.isLoading = true
      authObs = this.authService.signUp(email,password)
    }

    authObs.subscribe((res) => {
      this.isLoading = false;
      this.isLogin = true
      this.error = null
      this.router.navigate([''])

    },error => {
      this.isLoading = false
      this.error = (error.error.error.message);
    })
  }

}
