import { ModalController } from '@/app/shared/controller/modal-controller';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DpiPageComponent } from '../dpi-page/dpi-page.component';
import { PrequalifiedCustomerPageComponent } from '../prequalified-customer-page/prequalified-customer-page.component';

import { QuoterPageComponent } from './quoter-page.component';
import { CreditCalculatorComponent } from '../../../components/credit-calculator/credit-calculator.component';
import { ButtonComponent } from '@/app/components/button/button.component';
import { InputComponent } from '@/app/components/input/input.component';
import { SelectSpinnerComponent } from '@/app/components/select-spinner/select-spinner.component';
import { InputAlertsComponent } from '@/app/components/input-alerts/input-alerts.component';
import { AmountInputComponent } from '@/app/components/amount-input/amount-input.component';


const routes: Routes = [{
  path: '',
  component: DpiPageComponent
}, {
  path: 'prequalified-customer',
  component: PrequalifiedCustomerPageComponent
}, {
  path: 'quoter',
  component: QuoterPageComponent
}];

describe('QuoterPageComponent', () => {
  let component: QuoterPageComponent;
  let fixture: ComponentFixture<QuoterPageComponent>;
  let modal: ModalController
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoterPageComponent, CreditCalculatorComponent, ButtonComponent, InputComponent, SelectSpinnerComponent, InputAlertsComponent, AmountInputComponent ],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [ DialogService, MessageService, DynamicDialogRef,DynamicDialogConfig, ModalController]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoterPageComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    modal = TestBed.inject(ModalController)
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return "disabled"', () => {
    const color = component.ValidButton();
    expect(color).toBe('disabled')
  })
  it('Should return "primary"', () => {
    component.form.get('name')?.setValue('Kelsier')
    component.isAmountInvalid = false;
    const color = component.ValidButton();
    expect(color).toBe('primary')
  })
  it('Should display a modal', () => {
    const modalSpy = spyOn(modal, 'showDialogInfo')
    component.requestCredit()
    expect(modalSpy).toHaveBeenCalledTimes(1)
  })
  
  it('Should navigate to credits/', () => {
    const routerSpy = spyOn(router, 'navigate')
    component.cancel()
    expect(routerSpy).toHaveBeenCalledTimes(1)
    expect(routerSpy).toHaveBeenCalledWith([`credits/`])
  })
  
  it('Should set the isAmountInvalid value as true', () => {
    component.changeIsValidValue(true)
    expect(component.isAmountInvalid).toBeTruthy()
  })
  it('Should set the isAmountInvalid value as false', () => {
    component.changeIsValidValue(false)
    expect(component.isAmountInvalid).toBeFalsy()
  })
});
