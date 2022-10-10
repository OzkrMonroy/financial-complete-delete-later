import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputAlertsComponent } from './input-alerts.component';

describe('InputAlertsComponent', () => {
  let component: InputAlertsComponent;
  let fixture: ComponentFixture<InputAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAlertsComponent ],
      imports: [ReactiveFormsModule, FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAlertsComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      dpi: new FormControl('12', Validators.minLength(15)),
      noerror: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return the error message from the form', () => {
    component.name = 'name'
    const error = component.getError();
    
    expect(error).toBe('Este campo es requerido')
  })
  it('Should return the dpi error minium characters message', () => {
    component.name = 'dpi'
    component.rule = 'dpi'
    const error = component.getError();
    
    expect(error).toBe('El DPI debe tener 13 dígitos')
  })
  it('Should return an empty string', () => {
    component.name = 'noerror'
    const error = component.getError();
    
    expect(error).toBe('')
  })
  it('Should return an empty string when the control does not exist', () => {
    component.name = 'noexists'
    const error = component.getError();
    
    expect(error).toBe('')
  })
});
