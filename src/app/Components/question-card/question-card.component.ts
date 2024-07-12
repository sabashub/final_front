import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {
  questionForm!: FormGroup;

  constructor(private fb: FormBuilder, private appService: AppService, ) { }

  mandatoryController = new FormControl(false)

  ngOnInit(): void {
   
    
    this.questionForm = this.fb.group({
      question: [''],
      answer: [''],
      mandatory: ['0',]
    });
   
}


toggleCheckbox(checked: boolean) {
  this.questionForm.get('mandatory')?.setValue(checked ? '1' : '0');
}

onSubmit(): void {
  if (this.questionForm.valid) {
    this.appService.addQuestion(this.questionForm.value)
      .subscribe(
        (response: any) => {
          console.log('question added:', response);
        
        },
        (error: any) => {
          console.error(' error:', error);
          
        }
      );
  }
}




}




