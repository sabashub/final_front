import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../app.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{
  questionForm!: FormGroup;



 
  
  
    constructor(private fb: FormBuilder, private appService: AppService, ) {}
  
    ngOnInit(): void {
      this.questionForm = this.fb.group({
        question: [''],
        answer: [''],
        mandatory: ['0']  
      });
    }
  
    onMandatoryChange(event: any): void {
      this.questionForm.get('mandatory')?.setValue(event.target.checked ? '1' : '0');
    }
  
    onSubmit(): void {
      console.log(this.questionForm.value);
  
   
      this.appService.addQuestion(this.questionForm.value).subscribe(
        (response: any) => {
          this.appService.notifyDataChange();
          console.log('Question added:', response);
          this.questionForm.reset({ mandatory: '0' });
        },
        (error: any) => {
          console.error('Error adding question:', error);
        }
      );
    }
  }

