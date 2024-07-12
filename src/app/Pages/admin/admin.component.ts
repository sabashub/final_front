import { Component, OnInit } from '@angular/core';
import { QuestionCardComponent } from '../../Components/question-card/question-card.component';
import { AppService } from '../../app.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [QuestionCardComponent, TableModule, CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  questionForm!: FormGroup;
  editForm!: FormGroup;
  questions: any[] = [];
  answers: any[] = [];
  users: string[] = [];
  selectedUser!: string;
  filteredAnswers: any[] = [];

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
    this.fetchQuestions();
    this.fetchAnswers();
    this.questionForm = this.fb.group({
      question: [''],
      answer: [''],
      mandatory: ['0']
    });

    this.editForm = this.fb.group({
      editQuestion: [''],
      editAnswer: [''],
      editMandatory: ['']
    });
  }

  fetchQuestions(): void {
    this.appService.getQuestions().subscribe(
      (data: any[]) => {
        this.questions = data;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  toggleCheckbox(checked: boolean) {
    this.questionForm.get('mandatory')?.setValue(checked ? '1' : '0');
  }

  onMandatoryChange(event: any): void {
    this.questionForm.get('mandatory')?.setValue(event.target.checked ? '1' : '0');
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      this.appService.addQuestion(this.questionForm.value).subscribe(
        (response: any) => {
          console.log('Question added:', response);
          this.fetchQuestions();
          this.questionForm.reset();
        },
        (error: any) => {
          console.error('Error adding question:', error);
        }
      );
    }
  }

  editQuestion(question: any): void {
    this.editForm.setValue({
      editQuestion: question.question,
      editAnswer: question.answer,
      editMandatory: question.mandatory === '1'
    });
    question.editing = true;
  }

  updateQuestion(question: any): void {
    if (this.editForm.valid) {
      const updatedQuestion = {
        question: this.editForm.value.editQuestion,
        answer: this.editForm.value.editAnswer,
        mandatory: this.editForm.value.editMandatory ? '1' : '0'
      };

      this.appService.updateQuestion(updatedQuestion, question.id).subscribe(
        (response: any) => {
          console.log('Question updated:', response);
          this.fetchQuestions();
          question.editing = false;
        },
        (error: any) => {
          console.error('Error updating question:', error);
        }
      );
    }
  }

  fetchAnswers(): void {
    this.appService.getAnswers().subscribe(
      (data: any[]) => {
        this.answers = data;
        const uniqueUsers = new Set(data.map(item => item.name_surname));
        this.users = Array.from(uniqueUsers);
        console.log(this.answers);
        console.log("users", this.users);
      },
      (error: any) => {
        console.error('Error fetching answers:', error);
      }
    );
  }

  selectUser(user: string): void {
    this.selectedUser = user;
    this.filteredAnswers = this.answers.filter(answer => answer.name_surname === user);
  }
}



  


