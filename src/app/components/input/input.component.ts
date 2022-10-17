import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  InputAutoComplete,
  InputColors,
  InputRules,
  InputType,
} from 'src/app/types/input';
import { ValidatorFactoryService } from '@/app/utils/validator/validator-factory/validator-factory-service';
import { CustomAbstractControl } from '@/app/shared/models/validator-model/CustomAbstractControl';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  errorDisplayed = false;
  @Input() form!: FormGroup;
  @Input() label: string = 'Default label';
  @Input() id: string = 'default-id';
  @Input() name: string = 'default-name';
  @Input() length: string = '50';
  @Input() rule: InputRules = 'inherit';

  @Input() required: boolean = false;
  @Input() color: InputColors = 'primary';

  @Input() type: InputType = 'text';
  @Input() containerClasses: string = '';
  @Input() isInvalidAmount: boolean = false;
  @Input() autoComplete: InputAutoComplete = 'off';
  @Input() inputInformation!: string

  @ViewChild('inputRef') inputElement!: ElementRef;

  dpiValue: string = ''

  constructor(private readonly factoryValidator: ValidatorFactoryService) {}

  get isErrorDisplayed(): boolean {
    return this.errorDisplayed
  }

  validationValue(event: KeyboardEvent): boolean | KeyboardEvent | void{
    const { value } = this.inputElement.nativeElement;
    const valueWord = `${value}${event.key}`;
    this.factoryValidator.rule = this.rule;
    const control: CustomAbstractControl = {
      value: valueWord,
      length: +this.length,
      key: event.key
    };

    let validator = this.factoryValidator.createValidatorKeyBoardEvent();
    
    if (validator) {
      let answer = validator.validation(control);
      
      if (answer === null) {
        return event;
      } else {
        return false;
      }
    }
    
    return this.rule === 'inherit' ? event : false;
  }

  mustFloat() {
    return this.form.get(this.name)?.value !== '';
  }

  getInputColor() {
    if (this.form.get(this.name)?.errors && this.form.get(this.name)?.touched) {
      return 'error';
    }
    if (this.isInvalidAmount) {
      return 'error';
    }
    return this.color;
  }
  setErrorDisplayed(value: boolean):void {
    this.errorDisplayed = value
  }
  onPaste(event: ClipboardEvent):void {
    event.preventDefault();
  }
}
