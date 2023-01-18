import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactsForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.email]),
    message: new FormControl('' , [Validators.required])
  })
  isLoading = false

  constructor(private authService:AuthService , private router:Router) { }

  submit(){
    this.authService.user.subscribe(user => {
      if (user) {
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
          let name = this.contactsForm.controls.name.value;
          let msg = this.contactsForm.controls.message.value;
          window.alert(`Your Email Is : ${name} and Your Msg is : ${msg}`)
          console.log(this.contactsForm);
          this.contactsForm.reset()
        }, 1000);
      }else{
        this.router.navigate(['/auth'])
      }
    })

  }

  ngOnInit(): void {
  }

}
