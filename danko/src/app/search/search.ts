import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input
      type="text"
      placeholder="Search..."
      [(ngModel)]="query"
      (ngModelChange)="onQueryChange()"
    />
  `,

  styles: [`
    input {
      padding: 5px 10px;
      margin-bottom: 10px;
      width: 100%;
      max-width: 300px;
      box-sizing: border-box;
    }
  `]
})
export class SearchComponent {
  query: string = '';

  @Output() queryChange = new EventEmitter<string>();

  onQueryChange() {
    this.queryChange.emit(this.query);
  }
}
