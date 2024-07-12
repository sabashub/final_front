import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
@Component({
  selector: 'app-default-page',
  standalone: true,
  imports: [ButtonModule, RouterModule],
  templateUrl: './default-page.component.html',
  styleUrl: './default-page.component.css'
})
export class DefaultPageComponent {
  constructor(){

  }



}
