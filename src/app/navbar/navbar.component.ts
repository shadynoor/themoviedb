import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  authSub!:Subscription
  isAuth = false

  constructor(private authService:AuthService) {
    this.authService.autoLogin()
  }

  logout(){
    this.authService.logout()
    this.isAuth = false
  }

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuth = true
      }else{
        this.isAuth = false
      }
    })
  }

}
