import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label>
      Search:
      <input
        type="text"
        [(ngModel)]="query"
        (ngModelChange)="onQueryChange()"
        placeholder="Type to search..."
      />
    </label>
  `,
  styles: [`
    input {
      padding: 0.3rem 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      width: 200px;
      margin-bottom: 0.5rem;
    }
  `]
})
export class SearchComponent {
  query: string = '';

  // Output emitujúci hodnotu do parent komponentu
  @Output() queryChange = new EventEmitter<string>();

  onQueryChange() {
    this.queryChange.emit(this.query);
  }
}
