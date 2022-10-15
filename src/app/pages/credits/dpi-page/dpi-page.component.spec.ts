import { ButtonComponent } from '@/app/components/button/button.component';
import { InputAlertsComponent } from '@/app/components/input-alerts/input-alerts.component';
import { InputComponent } from '@/app/components/input/input.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DpiPageComponent } from './dpi-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PrequalifiedCustomerService } from '@/app/services/credits/prequalified/prequalified-customer.service';
import { ModalController } from '@/app/shared/controller/modal-controller';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { prequalifiedDetailsMock } from '@/app/shared/mocks/testing-prequalified';
import { Router, Routes } from '@angular/router';
import { PrequalifiedCustomerPageComponent } from '../prequalified-customer-page/prequalified-customer-page.component';
import { QuoterPageComponent } from '../quoter-page/quoter-page.component';
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

describe('DpiPageComponent', () => {
  let component: DpiPageComponent;
  let fixture: ComponentFixture<DpiPageComponent>;
  let service: PrequalifiedCustomerService;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpiPageComponent, InputComponent, ButtonComponent, InputAlertsComponent, AmountInputComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [PrequalifiedCustomerService, DialogService, MessageService, DynamicDialogRef,DynamicDialogConfig, ModalController]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DpiPageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PrequalifiedCustomerService);
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Should get the prequalified customer details', async () => {
    const serviceSpy = spyOn(service, 'verifyCustomer').and.callFake(() => Promise.resolve(prequalifiedDetailsMock.data));
    await component.validQueryDPI()
    expect(serviceSpy).toHaveBeenCalled()
    expect(component.customerDetails).toEqual(prequalifiedDetailsMock.data)
  })
  
  it('Should displayed an alert when an error occurred', async () => {
    const serviceSpy = spyOn(service, 'verifyCustomer').and.callFake(() => Promise.reject({ errors: [''] }));
    const routerSpy = spyOn(router, 'navigate')

    await component.validQueryDPI()
    expect(serviceSpy).toHaveBeenCalled()
    expect(component.customerDetails).toEqual({} as any)
    expect(routerSpy).toHaveBeenCalledTimes(1)
    expect(routerSpy).toHaveBeenCalledWith([`credits/quoter`] )
  })

});
