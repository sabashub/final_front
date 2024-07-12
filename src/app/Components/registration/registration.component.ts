import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../CustomValidators';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', [Validators.required,]],
      password: ['', [CustomValidators.passwordValidator()]],
      UserRole: [0, []],
    }
  );
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.appService.registerUser(this.registrationForm.value)
        .subscribe(
          (response: any) => {
            console.log('Registration successful:', response);
            
          },
          (error: any) => {
            console.error('Registration error:', error);
            
          }
        );
    }
  }

 
}