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

describe('DpiPageComponent', () => {
  let component: DpiPageComponent;
  let fixture: ComponentFixture<DpiPageComponent>;
  let service: PrequalifiedCustomerService;
  let modal: ModalController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DpiPageComponent, InputComponent, ButtonComponent, InputAlertsComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [PrequalifiedCustomerService, DialogService, MessageService, DynamicDialogRef,DynamicDialogConfig, ModalController]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DpiPageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PrequalifiedCustomerService);
    modal = TestBed.inject(ModalController);
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
    const modalSpy = spyOn(modal, 'showDialogError')

    await component.validQueryDPI()
    expect(serviceSpy).toHaveBeenCalled()
    expect(component.customerDetails).toEqual({} as any)
    expect(modalSpy).toHaveBeenCalledTimes(1)
    expect(modalSpy).toHaveBeenCalledWith('', jasmine.any(Function))
  })

});
