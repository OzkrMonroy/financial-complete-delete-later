import { InputAutoComplete, InputColors } from '@/app/types/input';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss']
})
export class AmountInputComponent{
  public pattern = { '0': { pattern: /^\S+$/, symbol: '' } }
  @Input() form!: FormGroup;
  @Input() label: string = 'Default label';
  @Input() id: string = 'default-id';
  @Input() name: string = 'default-name';
  @Input() length: string = '50';

  @Input() required: boolean = false;
  @Input() color: InputColors = 'primary';

  @Input() containerClasses: string = '';
  @Input() autoComplete: InputAutoComplete = 'off';

  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('myInput') myInput!: ElementRef;

  setFocus(): void {
    this.myInput.nativeElement.select();
  }

  keepValueZero(event: any){
    if (event.target.value === '') {
      event.target.value = 0;
    }
  }

  preventSpace(event: KeyboardEvent): KeyboardEvent | boolean{
    if(event.code === 'Space'){
      return false
    }
    return event
  }

  getSize(input: any): number {
    const length = input.value.length;
    const size = length > 1 ? length - 1 : length;
    
    return length === 0 ? 1 : size;
  }

  getValueLength(input: any):number {
    const length = input.value.length;
    return length;
  }
}
