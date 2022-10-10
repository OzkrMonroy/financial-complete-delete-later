import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController } from './modal-controller';
import {DialogService} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import { AlertModalComponentModule } from '../components/alert-modal/alert-modal.component.module';

@NgModule({

  imports: [
    ReactiveFormsModule,
    CommonModule,
    AlertModalComponentModule
  ],
  providers:[DialogService, MessageService, ModalController],
})
export class ModalControllerModule { }