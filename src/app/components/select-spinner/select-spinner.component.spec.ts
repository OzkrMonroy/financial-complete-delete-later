import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSpinnerComponent } from './select-spinner.component';

describe('ButtonComponent', () => {
  let component: SelectSpinnerComponent;
  let fixture: ComponentFixture<SelectSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
