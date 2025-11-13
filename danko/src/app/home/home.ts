import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="home">
      <h2></h2>
      <p></p>
      <img src="assets/my-header.jpg" alt="Quest banner">
    </section>
  `,
  styleUrls: ['./home.css']
})
export class HomeComponent { }