import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, FormsModule] // standalone komponent
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update query when input changes', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'test';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.query).toBe('test');
  });

  it('should emit queryChange on input change', () => {
    spyOn(component.queryChange, 'emit');

    component.query = 'hello';
    component.onQueryChange();

    expect(component.queryChange.emit).toHaveBeenCalledWith('hello');
  });
});
