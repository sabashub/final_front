import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, ButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loggedInUser: any; 
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.login()
    
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    
    // this.isLoggedIn = this.appService.isLoggedIn();
    // if (this.isLoggedIn) {
    //   this.loggedInUser = this.appService.getUserInfo();
    // }
    this.appService.getUser().subscribe(resp=>{
      console.log(resp)
      this.loggedInUser = resp
      this.isLoggedIn = true;
    })
    
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.appService.loginUser(this.loginForm.value)
        .subscribe(
          (response) => {
            console.log('Login successful:', response);
            localStorage.setItem('token' , response.jwt)
            this.loggedInUser = response
            this.isLoggedIn = true;
            this.login();
          },
          (error) => {
            console.error('Login error:', error);
           
          }
        );
    }
    
  }

  login(){
    if(this.isLoggedIn){
      this.router.navigateByUrl("Admin")
    }
  }

  logout(): void {
    this.appService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = undefined;
  }
}
