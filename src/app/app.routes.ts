import { Routes } from '@angular/router';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LoginRegistrationComponent } from './Components/login-registration/login-registration.component';
import { AdminComponent } from './Pages/admin/admin.component';
import { QuestionCardComponent } from './Components/question-card/question-card.component';
import { QuestionaireComponent } from './Pages/questionaire/questionaire.component';
export const routes: Routes = [
    
        
        { path: '', component: LoginRegistrationComponent },
        { path: 'Admin', component: AdminComponent },
        { path: 'Questionaire', component: QuestionaireComponent},
        
];
