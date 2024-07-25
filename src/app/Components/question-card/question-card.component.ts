import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule, CardModule, CommonModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {
  questionsForm!: FormGroup;

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit(): void {
    this.questionsForm = this.fb.group({
      questions: this.fb.array([])  // Initialize with an empty FormArray
    });
    this.appService.dataUpdated$.subscribe(() => {
      this.fetchQuestions();
    });

    this.fetchQuestions();
  }

  


  get questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }
  

  fetchQuestions(): void {
    this.appService.getQuestions().subscribe(
      (questions: any[]) => {
        const questionControls = questions.map(question =>
          this.fb.group({
            id: [question.id],
            question: [question.question],
            answer: [question.answer],
            mandatory: [question.mandatory == '1'],
            isEditing: [false]  
          })
        );
        this.questions.clear();
        questionControls.forEach(control => this.questions.push(control));
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }
  

  onEdit(index: number): void {
    const formGroup = this.questions.at(index) as FormGroup;
    formGroup.get('isEditing')?.setValue(true);  // Enable editing for this card
  }

  onSave(index: number): void {
    const formGroup = this.questions.at(index) as FormGroup;
    formGroup.get('isEditing')?.setValue(false);  // Disable editing for this card

    // Convert checkbox value to '1' or '0'
    const mandatory = formGroup.get('mandatory')?.value ? '1' : '0';
    
    // Create an object with only the required fields for update
    const { id, isEditing, ...updatedQuestion } = formGroup.value;
    updatedQuestion.mandatory = mandatory;
    
    this.appService.updateQuestion(updatedQuestion, id).subscribe(
      (response) => {
        console.log('Question updated:', response);
        this.fetchQuestions();  // Refresh the list after update
      },
      (error) => {
        console.error('Error updating question:', error);
      }
    );
  }

  onCancel(index: number): void {
    const formGroup = this.questions.at(index) as FormGroup;
    formGroup.get('isEditing')?.setValue(false);  // Disable editing for this card
    this.fetchQuestions();  // Optionally refresh to discard changes
  }

}

