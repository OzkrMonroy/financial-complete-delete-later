import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { ButtonComponent } from './button/button.component';
import { PrequalifiedCustomerDetailsComponent } from './prequalified-customer-details/prequalified-customer-details.component';
import { InputComponent } from './input/input.component';
import { InputAlertsComponent } from './input-alerts/input-alerts.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { SelectSpinnerComponent } from './select-spinner/select-spinner.component';
import { CreditCalculatorComponent } from './credit-calculator/credit-calculator.component';
import { AmountInputComponent } from './amount-input/amount-input.component';
import { InputInformationComponent } from './input-information/input-information.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

const components = [
  ButtonComponent,
  PrequalifiedCustomerDetailsComponent,
  InputComponent,
  AmountInputComponent,
  InputAlertsComponent,
  InputInformationComponent,
  LayoutComponent,
  HeaderComponent,
  SelectSpinnerComponent,
  CreditCalculatorComponent
]

@NgModule({
  declarations: components,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxMaskModule.forRoot(),
  ],
  exports: components
})
export class ComponentsModule { }
