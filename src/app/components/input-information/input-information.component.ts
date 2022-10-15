import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-information',
  templateUrl: './input-information.component.html',
  styles: [
  ]
})
export class InputInformationComponent {
  @Input() parentForm!: FormGroup
  @Input() name!: string;
  @Input() inputInformation: string = ''
  @Input() invalid: boolean = false;

}
