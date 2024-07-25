import { Component, OnInit } from '@angular/core';
import { QuestionCardComponent } from '../../Components/question-card/question-card.component';
import { AppService } from '../../app.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AddQuestionComponent } from '../../Components/add-question/add-question.component';
import { ResultsComponent } from '../../Components/results/results.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [QuestionCardComponent, TableModule, CommonModule, ReactiveFormsModule, ButtonModule, AddQuestionComponent, ResultsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  {
 
 
  currentView: 'admin' | 'results' = 'admin'; // Default view

  switchView(view: 'admin' | 'results') {
    this.currentView = view;
  }

}



  


