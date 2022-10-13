import { StringUtils } from '@/app/utils/stringutils/string-utils';
import { Component, Input, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AnimationClass } from '../../utils/animationClass';
@Component({
  selector: 'app-credit-calculator',
  templateUrl: './credit-calculator.component.html',
  styles: [
  ]
})
export class CreditCalculatorComponent implements OnInit {
  @Input() formQuoter!: FormGroup;
  @Input() title: string | null= null;
  
  fee: number = 0.00;
  term: number =0;
  domain: number[]= [12,18,24];
  isLoading: boolean = false;
  isInvalid: boolean = false;
  maxLoanAmount: number = 50000;
  minLoanAmount: number = 2500;
  constructor( ) {
    this.term = this.domain[0];

  }

eventQuoter(term: number){ 
  this.term= term;
  this.calculateQuoter();
}

ngOnInit(): void {
  this.createForm();
  this.changeFormValue();

}

createForm(): void {
  this.formQuoter.addControl("Amount",new FormControl('', Validators.required),);
  this.formQuoter.addControl("Term",new FormControl('', Validators.required),);
  
}

changeFormValue(): void {
    
  this.formQuoter
    .get('Amount')
    ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
    .subscribe(() => {
      
      this.isInvalid = false;
   
      if (this.isInvalid ) {
        AnimationClass(
          document.getElementById('quoter-page.fee.label') as HTMLElement,
          'animate-shake'
        );
      }
      if(!this.isInvalid){          
        this.calculateQuoter();
      }
    });
}

  calculateQuoter() {
   
    this.fee=this.term*5*+this.formQuoter.get('Amount')?.value;
  }

  formatNumber(number: number | string): string {
    return StringUtils.formatAmount(number);
  }
}
