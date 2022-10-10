import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstPageComponent } from './first-page/first-page.component';
import { FirstModuleRoutingModule } from './first-module-routing.module';
import { ComponentsModule } from '@/app/components/components.module';


@NgModule({
  declarations: [
    FirstPageComponent,
  ],
  imports: [
    CommonModule,
    FirstModuleRoutingModule,
    ComponentsModule
  ]
})
export class FirstModuleModule { }
