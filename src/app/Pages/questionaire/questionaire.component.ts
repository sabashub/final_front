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
  submitted = false;

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      name_surname: ['', Validators.required],
      questionAnswers: this.fb.array([]) // Initialize as an empty FormArray
    });

    this.fetchQuestions();
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
        answer: ['', question.mandatory == '1' ? Validators.required : null]
      });
    });

    this.questionForm.setControl('questionAnswers', this.fb.array(questionControls));
  }

  get questionAnswersArray() {
    return this.questionForm.get('questionAnswers') as FormArray;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.questionForm.valid) {
      const name_surname = this.questionForm.value.name_surname;
      const questionAnswers = this.questionForm.value.questionAnswers;

      const finalObject = {
        name: name_surname,
        questionsAndAnswers: questionAnswers.map((qa: any) => ({
          question: qa.question,
          answer: qa.answer
        }))
      };

      console.log('Final JSON Object:', finalObject);

      this.appService.sendResult(finalObject)
        .subscribe(
          (response: any) => {
            console.log('Successful:', response);
            alert("პასუხები გაგზავნილია წარმატებით");
            this.questionForm.reset()
          },
          (error: any) => {
            console.error('Error:', error);
          }
        );

    } else {
      console.error('Form is invalid');
    }
  }
}



