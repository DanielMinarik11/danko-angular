import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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