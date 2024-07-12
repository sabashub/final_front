import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';

import { DefaultPageComponent } from './Pages/default-page/default-page.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegistrationComponent, RegistrationComponent, LoginComponent, DefaultPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'final_front';
}
