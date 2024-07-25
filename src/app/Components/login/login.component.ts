import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, ButtonModule, ReactiveFormsModule, CommonModule, ToastModule, ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loggedInUser: any; 
  isLoggedIn: boolean = false;
  failedAttempts: number = 0;
  isLoginDisabled: boolean = false;
  timer: any;

  constructor(
    private fb: FormBuilder, 
    private appService: AppService, 
    private router: Router, 
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.appService.getUser().subscribe(resp => {
      console.log(resp);
      this.loggedInUser = resp;
      this.isLoggedIn = true;
    });

    this.checkLockoutStatus();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.appService.loginUser(this.loginForm.value)
        .subscribe(
          (response) => {
            console.log('Login successful:', response);
            localStorage.setItem('token', response.jwt);
            this.loggedInUser = response;
            this.isLoggedIn = true;
            this.failedAttempts = 0;
            this.clearLockoutData();
            this.login();
            this.messageService.add({severity: 'success', summary: 'Login Successful', detail: 'You have successfully logged in!'});
          },
          (error) => {
            console.error('Login error:', error);
            this.failedAttempts++;
            this.messageService.add({severity: 'error', summary: 'Login Failed', detail: 'Invalid username or password'});

            if (this.failedAttempts >= 3) {
              this.disableLogin();
            } else {
              this.saveFailedAttempts();
            }
          }
        );
    }
  }

  disableLogin(): void {
    this.isLoginDisabled = true;
    const lockoutEndTime = new Date().getTime() + 60000; // 1 minute lockout
    localStorage.setItem('lockoutEndTime', lockoutEndTime.toString());
    this.messageService.add({severity: 'warn', summary: 'Account Locked', detail: 'Too many failed attempts. Please try again in 1 minute.'});
    
    this.timer = setTimeout(() => {
      this.isLoginDisabled = false;
      this.failedAttempts = 0;
      this.clearLockoutData();
    }, 60000);
  }

  checkLockoutStatus(): void {
    const lockoutEndTime = localStorage.getItem('lockoutEndTime');
    if (lockoutEndTime) {
      const now = new Date().getTime();
      if (now < parseInt(lockoutEndTime)) {
        this.isLoginDisabled = true;
        this.failedAttempts = parseInt(localStorage.getItem('failedAttempts') || '0');
        this.timer = setTimeout(() => {
          this.isLoginDisabled = false;
          this.failedAttempts = 0;
          this.clearLockoutData();
        }, parseInt(lockoutEndTime) - now);
      } else {
        this.clearLockoutData();
      }
    }
  }

  saveFailedAttempts(): void {
    localStorage.setItem('failedAttempts', this.failedAttempts.toString());
  }

  clearLockoutData(): void {
    localStorage.removeItem('failedAttempts');
    localStorage.removeItem('lockoutEndTime');
  }

  login(): void {
    if (this.isLoggedIn) {
      this.router.navigateByUrl("Admin");
    }
  }

  logout(): void {
    this.appService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = undefined;
  }
}
