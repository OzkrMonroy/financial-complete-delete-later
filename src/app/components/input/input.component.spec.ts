import { ValidatorDPIService } from '@/app/utils/validator/validator-dpi/validator-dpi-service';
import { ValidatorFactoryService } from '@/app/utils/validator/validator-factory/validator-factory-service';
import { ValidatorPhoneService } from '@/app/utils/validator/validator-phone/validator-phone-service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputAlertsComponent } from '../input-alerts/input-alerts.component';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let validationsService: ValidatorFactoryService;
  const event = { key: 'X' } as KeyboardEvent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent, InputAlertsComponent],
      providers: [ValidatorFactoryService],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.name = 'name';
    component.color = 'primary';
    component.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    validationsService = TestBed.inject(ValidatorFactoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return the error word', () => {
    const form = component.form;
    form.get('name')?.markAsTouched();

    const color = component.getInputColor();
    expect(color).toBe('error');
  });
  it('should return the color value', () => {
    const form = component.form;
    form.get('name')?.setValue('name');
    form.get('name')?.markAsTouched();

    const color = component.getInputColor();
    expect(color).toBe(component.color);
  });
  it('should return the error word when the amount is invalid', () => {
    component.isInvalidAmount = true;
    const form = component.form;
    form.get('name')?.setValue('name');
    form.get('name')?.markAsTouched();

    const color = component.getInputColor();
    expect(color).toBe('error');
  });

  it('Should call the stringValidation function from the inputValidationService', () => {
    component.rule = 'string';
    const stringValidationSpy= spyOn(validationsService, 'createValidatorKeyBoardEvent');
    component.validationValue(event);
    expect(stringValidationSpy).toHaveBeenCalled();
  });

  it('Should call the addressValidation function from the inputValidationService', () => {
    component.rule = 'address';
    const addressValidationSpy = spyOn(validationsService, 'createValidatorKeyBoardEvent');
    component.validationValue(event);
    expect(addressValidationSpy).toHaveBeenCalled();
  });

  it('Should call the amountValidation function from the inputValidationService', () => {
    component.rule = 'amount';
    component.length = '8'
    const amountValidationSpy = spyOn(validationsService, 'createValidatorKeyBoardEvent');
    component.validationValue(event);
    expect(amountValidationSpy).toHaveBeenCalledWith();
  });
  
  it('Should call the dpiValidation function from the inputValidationService and return false when the validationValue is called', () => {
    component.rule = 'dpi';
    const dpiValidationSpy = spyOn(validationsService, 'createValidatorKeyBoardEvent');
    component.validationValue(event);

    expect(dpiValidationSpy).toHaveBeenCalledWith();
  });
  it('Should call the dpiValidationFormat function from the inputValidationService and return true then should call dpiFormat function and return the event', () => {
    component.rule = 'dpi';
    const dpiValidation = spyOn(validationsService, 'createValidatorKeyBoardEvent').and.callFake(() => new ValidatorDPIService())
    const dpiFormatSpy = spyOn(component, 'dpiFormat')
    const resp = component.validationValue({key: '2263 55292 1108'} as KeyboardEvent);
    expect(dpiValidation).toHaveBeenCalledTimes(1);
    expect(dpiFormatSpy).toHaveBeenCalledTimes(1);
    expect(resp).toEqual({key: '2263 55292 1108'} as KeyboardEvent)
  });

  it('Should call the numberValidation function from the inputValidationService', () => {
    component.rule = 'number';
    component.length = '8'
    const numberValidationSpy = spyOn(validationsService, 'createValidatorKeyBoardEvent');
    component.validationValue(event);
    expect(numberValidationSpy).toHaveBeenCalled();
  });
  
  it('Should call the phoneValidation function from the inputValidationService', () => {
    component.rule = 'phone';
    component.length = '8'
    const phoneValidationSpy = spyOn(validationsService, 'createValidatorKeyBoardEvent').and.callFake(() => new ValidatorPhoneService());
    const resp = component.validationValue({ key: '56501267' } as KeyboardEvent);
    expect(phoneValidationSpy).toHaveBeenCalledWith();
    expect(resp).toEqual({ key: '56501267' } as KeyboardEvent)

  });
  it('Should return the event when the rule is inherit', () => {
    component.rule = 'inherit';
    const resp = component.validationValue(event);
    expect(resp).toEqual(event)
  });

  it('Should cut the text if the dpi is longer than 15', () => {
    component.form.get('name')?.setValue('1234567890123456');
    component.dpiFormat()
    expect(component.form.get('name')?.value).toBe('1234 56789 0123')
  })
  
  it('Should not paste in the input', () => {
    const event = { preventDefault: () => {} }
    const preventSpy = spyOn(event, 'preventDefault')

    component.onPaste(event as ClipboardEvent);
    expect(preventSpy).toHaveBeenCalledTimes(1)
  })

});
