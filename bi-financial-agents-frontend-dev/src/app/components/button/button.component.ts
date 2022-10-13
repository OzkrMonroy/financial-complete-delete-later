import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColor, ButtonType } from 'src/app/types/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: [
  ]
})
export class ButtonComponent{
  @Input() id: string = 'default-id'
  @Input() label: string = 'Default label';
  @Input() type: ButtonType = 'button';
  @Input() containerClasses: string = ''
  @Input() buttonClasses: string = ''
  @Input() buttonColor: ButtonColor = 'primary'
  @Output() clickEvent: EventEmitter<any> = new EventEmitter()

  buttonColors = {
    secondary: 'bg-blue-dark text-white hover:bg-digital-blue' + this.buttonClasses,
    disabled: 'bg-gray-disabled text-dark-gray' + this.buttonClasses,
    primary: 'bg-bi-yellow text-blue-dark text-[15px]  hover:bg-blue-dark hover:text-white' + this.buttonClasses,
    link: 'bg-transparent text-gray-dark underline w-[80px]' + this.buttonClasses
  }

  getClasses(): string{
    switch (this.buttonColor) {
      case 'secondary':
        return this.buttonColors.secondary
      case 'disabled':
        return this.buttonColors.disabled
      case 'link':
        return this.buttonColors.link
      default:
        return this.buttonColors.primary
    }
  }

  click(){

    if(this.buttonColor === 'disabled'){
      return
    }
    this.clickEvent.emit()
  }
}
