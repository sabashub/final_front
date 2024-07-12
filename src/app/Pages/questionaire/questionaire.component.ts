import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-questionaire',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './questionaire.component.html',
  styleUrl: './questionaire.component.css'
})
export class QuestionaireComponent implements OnInit{
  questionForm!: FormGroup;
  questions: any[] = [];
  allAnswers: any[] = [];

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
    this.fetchQuestions();
    
    this.questionForm = this.fb.group({
      name_surname: ['', Validators.required],
      questionAnswers: this.fb.array([])
    });
  }

  fetchQuestions(): void {
    this.appService.getQuestions().subscribe(
      (data: any[]) => {
        this.questions = data;
        this.initializeQuestionAnswers();
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  initializeQuestionAnswers(): void {
    const questionControls = this.questions.map(question => {
      return this.fb.group({
        question: [question.question],
        answer: ['', Validators.required]
      });
    });
    this.questionForm.setControl('questionAnswers', this.fb.array(questionControls));
  }

  get questionAnswersArray() {
    return this.questionForm.get('questionAnswers') as FormArray;
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      this.allAnswers = [];

      const name_surname = this.questionForm.value.name_surname;
      const questionAnswers = this.questionForm.value.questionAnswers;

      questionAnswers.forEach((answer: any) => {
        const answerObject = {
          name_surname: name_surname,
          question: answer.question,
          answer: answer.answer
        };
        this.allAnswers.push(answerObject);
      });

      console.log('All Answers:', this.allAnswers);
      this.appService.sendAnswers(this.allAnswers)
      .subscribe(
        (response: any) => {
          console.log(' successful:', response);
          alert("პასუხები გაგზავნილია წარმატებით")
        },
        (error: any) => {
          console.error(' error:', error);
          
        }
      );

    } else {
      console.error('Form is invalid');
    }
  }
}



