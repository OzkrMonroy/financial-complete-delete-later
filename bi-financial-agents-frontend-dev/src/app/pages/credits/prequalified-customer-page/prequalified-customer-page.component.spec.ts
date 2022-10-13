import { PrequalifiedCustomerDetailsComponent } from '@/app/components/prequalified-customer-details/prequalified-customer-details.component';
import { PrequalifiedCustomerService } from '@/app/services/credits/prequalified/prequalified-customer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  Router, Routes } from '@angular/router';
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
  let modal: ModalController;
  let router: Router

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
     modal = TestBed.inject(ModalController)
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('Should call router with a path', () => {
    const routerSpy = spyOn(router, 'navigate')
    component.goTo('');
    expect(routerSpy).toHaveBeenCalledTimes(1)
    expect(routerSpy).toHaveBeenCalledWith([`credits/`])
  })

  it('Should call the showDialogInfo function of modalController', () => {
    const modalSpy = spyOn(modal, 'showDialogInfo')
    component.modify();
    expect(modalSpy).toHaveBeenCalledTimes(1)
  })
  
  it('Should call the showDialogConfirmQuotation function of modalController', () => {
    const modalSpy = spyOn(modal, 'showDialogConfirmQuotation')
    component.applyFor();
    expect(modalSpy).toHaveBeenCalledTimes(1)
  })
});
