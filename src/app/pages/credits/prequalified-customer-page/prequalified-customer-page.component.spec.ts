import { PrequalifiedCustomerDetailsComponent } from '@/app/components/prequalified-customer-details/prequalified-customer-details.component';
import { PrequalifiedCustomerService } from '@/app/services/credits/prequalified/prequalified-customer.service';
import { prequalifiedDetailsMock } from '@/app/shared/mocks/testing-prequalified';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DpiPageComponent } from '../dpi-page/dpi-page.component';
import { QuoterPageComponent } from '../quoter-page/quoter-page.component';

import { PrequalifiedCustomerPageComponent } from './prequalified-customer-page.component';
import { ModalController } from '../../../shared/controller/modal-controller';

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

describe('PrequalifiedCustomerPageComponent', () => {
  let component: PrequalifiedCustomerPageComponent;
  let fixture: ComponentFixture<PrequalifiedCustomerPageComponent>;
  let service: PrequalifiedCustomerService;
  let modal: ModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrequalifiedCustomerPageComponent, PrequalifiedCustomerDetailsComponent ],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [PrequalifiedCustomerService, DialogService, MessageService, DynamicDialogRef,DynamicDialogConfig, ModalController]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrequalifiedCustomerPageComponent);
    component = fixture.componentInstance;
 
    service = TestBed.inject(PrequalifiedCustomerService)
    modal = TestBed.inject(ModalController)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 

  it('Should get the prequalified customer details', async () => {
    const serviceSpy = spyOn(service, 'verifyCustomer').and.callFake(() => Promise.resolve(prequalifiedDetailsMock.data));
    await component.ngOnInit()
    expect(serviceSpy).toHaveBeenCalled()
    expect(component.customerDetails).toEqual(prequalifiedDetailsMock.data)
  })
  
  it('Should displayed an alert when an error occurred', async () => {
    const serviceSpy = spyOn(service, 'verifyCustomer').and.callFake(() => Promise.reject({ errors: [''] }));
    const modalSpy = spyOn(modal, 'showDialogError')

    await component.ngOnInit()
    expect(serviceSpy).toHaveBeenCalled()
    expect(component.customerDetails).toEqual({} as any)
    expect(modalSpy).toHaveBeenCalledTimes(1)
    expect(modalSpy).toHaveBeenCalledWith('', jasmine.any(Function))
  })
  it('Should call the confirmation Modal', () => {
    const modalSpy = spyOn(modal, 'showDialogConfirmQuotation')
    component.goTo('');
    expect(modalSpy).toHaveBeenCalledTimes(1)
  })
});
