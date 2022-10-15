import { messageErrors } from '@/app/shared/models/validator-model/messageErrors';
import { InputRules } from '@/app/types/input';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-alerts',
  templateUrl: './input-alerts.component.html',
  styleUrls: ['./input-alerts.component.scss']
})
export class InputAlertsComponent implements OnInit, OnDestroy{
  @Input() parentForm!: FormGroup;
  @Input() rule: InputRules = 'inherit'
  @Input() name: string = ''
  @Input() isInvalidAmount: boolean = false;
  @Input() inputInformation: string = '';
  @Output() setErrorDisplayed: EventEmitter<boolean> = new EventEmitter<boolean>()
  
  ngOnInit(): void {
    this.setErrorDisplayed.emit(true)
  }
  ngOnDestroy(): void {
    this.setErrorDisplayed.emit(false)
  }

  getError(): string {
    const errors = Object.keys(this.parentForm.get(this.name)?.errors || {})
    const minLength = this.rule !== 'dpi' ? (this.parentForm.get(this.name)?.errors?.minlength?.requiredLength || 0) : '13'
    const maxLength = this.parentForm.get(this.name)?.errors?.maxlength?.requiredLength || 0
    const minErrorMessage = this.rule === 'dpi' ? "El DPI debe tener 13 dígitos" : null
    
    const errorsString = messageErrors(minLength, maxLength, minErrorMessage)
    const error: string = errors[0] || ''
    
    return errorsString[error] || ''
  }
}
