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
export class InputComponent{
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

  @ViewChild('inputRef') inputElement!: ElementRef;

  dpiValue: string = ''

  constructor(private readonly factoryValidator: ValidatorFactoryService) {}

  

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
      console.log({answer, control: control.value});
      
      if (answer === null) {
        console.log('There is a rule');
        
        if (this.rule == 'dpi') {
          console.log('Before dpi format');
          
          this.dpiFormat();
        }
        return event;
      } else {
        console.log('Not exist a rule', event);
        return false;
      }
    }
    console.log('There is nothing');
    
    return this.rule === 'inherit' ? event : false;
  }

  dpiFormat() {
    const input = this.inputElement.nativeElement;
    const { selectionStart } = input;
    const formInputValue = this.form.controls[this.name];

    let trimmedCardNum = formInputValue.value.replace(/\s+/g, '');

    if (trimmedCardNum.length > 15) {
      trimmedCardNum = trimmedCardNum.substr(0, 15);
    }

    const partitions = [4, 5, 4];

    const numbers: any[] = [];
    let position = 0;
    partitions.forEach((partition) => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    });

    formInputValue.setValue(numbers.join(' '));
    this.dpiValue = numbers.join(' ');

    if (selectionStart < formInputValue.value.length - 1) {
      input.setSelectionRange(selectionStart, selectionStart, 'none');
    }
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
  onPaste(event: ClipboardEvent):void {
    event.preventDefault();
  }
}
