import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { PrequalifiedCustomerDetailsComponent } from './prequalified-customer-details/prequalified-customer-details.component';
import { InputComponent } from './input/input.component';
import { InputAlertsComponent } from './input-alerts/input-alerts.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

const components = [
  ButtonComponent,
  PrequalifiedCustomerDetailsComponent,
  InputComponent,
  InputAlertsComponent,
  LayoutComponent,
  HeaderComponent
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
