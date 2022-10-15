import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AmountInputComponent } from './amount-input.component';

describe('AmountInputComponent', () => {
  let component: AmountInputComponent;
  let fixture: ComponentFixture<AmountInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountInputComponent ],
      imports: [ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountInputComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      amount: new FormControl('0', Validators.required), 
    });
    component.name = 'amount'
    component.myInput = { nativeElement: {
      focus: () => {}
    } }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should set the focus to the input element', () => {
    const inputSpy = spyOn(component.myInput.nativeElement, 'select');
    component.setFocus()
    expect(inputSpy).toHaveBeenCalledTimes(1)
  })
  it('Should set 0 as a value when the value is an empty string', () => {
    const event = { target: { value: '' } }
    component.keepValueZero(event)
    expect(String(event.target.value)).toBe('0')
  })
  it('Should return the size (1)', () => {
    const input = { value: '12' }
    const size = component.getSize(input)
    expect(size).toBe(1)
  })
  it('Should return false when space is pressed', () => {
    const event = { code: 'Space' } as KeyboardEvent
    const resp = component.preventSpace(event)
    expect(resp).toBeFalse()
  })
  
  it('Should return false when space is pressed', () => {
    const event = { code: '1' } as KeyboardEvent
    const resp = component.preventSpace(event)
    expect(resp).toEqual(event)
  })
});
