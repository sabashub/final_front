import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-registration',
  standalone: true,
  imports: [FormsModule, SelectButtonModule, LoginComponent, RegistrationComponent, CommonModule],
  templateUrl: './login-registration.component.html',
  styleUrl: './login-registration.component.css'
})
export class LoginRegistrationComponent {
  selectedComponent: 'login' | 'registration' = 'login';

  selectComponent(component: 'login' | 'registration') {
    this.selectedComponent = component;
  }
}
