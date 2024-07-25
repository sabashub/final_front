import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  users!: any[];
  selectedUserId!: string;
  selectedUser: any;
  filteredAnswers!: any[];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.fetchNames();
  }

  fetchNames(): void {
    this.appService.getNames().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching names:', error);
      }
    );
  }

  fetchUserResults(userId: string): void {
    this.appService.getResults(userId).subscribe(
      (data: any[]) => {
        this.filteredAnswers = data;
        this.selectedUser = this.users.find(user => user.id === userId)?.name || '';
        this.selectedUserId = userId; // Update the selected user ID
      },
      (error) => {
        console.error('Error fetching user results:', error);
      }
    );
  }

  onUserClick(userId: string): void {
    this.fetchUserResults(userId);
  }
}
