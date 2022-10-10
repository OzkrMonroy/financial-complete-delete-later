
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { ComponentsModule } from '@/app/components/components.module';
import { NgModule } from '@angular/core';
import { AlertModalComponent } from './alert-modal.component';

@NgModule({
  declarations:[AlertModalComponent] ,

  imports: [
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule
    
  ],
  providers:[DialogService, MessageService],
  exports: [AlertModalComponent]

})
export class AlertModalComponentModule { }