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

  it('Should return the second value of the terms', () => {
    const emitSpy = spyOn(component.changeEvent, 'emit')
    component.clickPlus()
    expect(emitSpy).toHaveBeenCalledWith(18)
  })
  
  it('Should return the first value of the terms', () => {
    component.indexActive = 1;
    const emitSpy = spyOn(component.changeEvent, 'emit')
    component.clickMinus()
    expect(emitSpy).toHaveBeenCalledWith(12)
    expect(component.indexActive).toBe(0)
  })
  it('Should return the same indexValue', () => {
    component.indexActive = 3;
    const newIndexActive = (component as any).nextIndex()
    expect(newIndexActive).toBe(component.indexActive)
  })
  it('Should return the 0 as indexValue', () => {
    component.indexActive = 0;
    const newIndexActive = (component as any).nextPrevious()
    expect(newIndexActive).toBe(component.indexActive)
  })
});
