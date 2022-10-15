import { NgModule } from '@angular/core';

import { CreditsRoutingModule } from './credits-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { PrequalifiedCustomerPageComponent } from './prequalified-customer-page/prequalified-customer-page.component';
import { DpiPageComponent } from './dpi-page/dpi-page.component';
import { QuoterPageComponent } from './quoter-page/quoter-page.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationScreenComponent } from '../confirmation-screen/confirmation-screen.component';

@NgModule({
  declarations: [DpiPageComponent, PrequalifiedCustomerPageComponent, QuoterPageComponent, ConfirmationScreenComponent],
  imports: [
    CreditsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule
  ],
})
export class CreditsModule { }
