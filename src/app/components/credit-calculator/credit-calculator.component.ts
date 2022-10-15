import { QuoterService } from '@/app/services/credits/quoter/quoter.service';
import { ModalController } from '@/app/shared/controller/modal-controller';
import { Quoter } from '@/app/shared/models/quoter';
import { StringUtils } from '@/app/utils/stringutils/string-utils';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ValidatorAmountService } from '../../utils/validator/validator-amount/validator-amount-service';
@Component({
  selector: 'app-credit-calculator',
  templateUrl: './credit-calculator.component.html',
  styles: [
  ]
})
export class CreditCalculatorComponent implements OnInit {
  @Input() formQuoter!: FormGroup;
  @Input() title: string | null= null;
  @Input() term: number =0;
  @Input() domain: number[]= [12,18,24];
  @Input() amount: number=0;
  @Output() changeIsAmountInvalid: EventEmitter<boolean> = new EventEmitter<boolean>()
  fee: number = 0.00;
  
  isLoading: boolean = false;
  isInvalid: boolean = false;
  maxLoanAmount: number = 30000;
  minLoanAmount: number = 6000;
  
  constructor(private readonly amountValidator: ValidatorAmountService,
              private readonly service: QuoterService,
              private readonly modal: ModalController) {
    this.term = this.domain[0];
  }

  eventQuoter(term: number) {
    this.term = term;
    this.calculateQuoter();
  }

ngOnInit(): void {
  this.createForm();
  this.changeFormValue();
  if(this.amount>0){
    this.calculateQuoter();
  }

  
}

createForm(): void {
  this.formQuoter.addControl("amount",new FormControl(this.amount, [Validators.required, this.amountValidator.thousandValidation]),);
 
}

changeFormValue(): void {
    
  this.formQuoter
    .get('amount')
    ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((amount) => {

      this.isInvalid = !(
        amount >= this.minLoanAmount && amount <= this.maxLoanAmount
      );
      this.changeIsAmountInvalid.emit(this.isInvalid)

      if (!this.isInvalid) {
        this.calculateQuoter();
      }else {
        this.fee = 0.00
      }
    });
  }

 async calculateQuoter() {
  let amount: number=+this.formQuoter.get('amount')?.value;
  
  if(!this.formQuoter.valid || amount <=0) {
    return;
  }
  
  try {
      let quoter: Quoter=  await this.service.qouter(this.term, amount);
      this.fee=quoter.monthlyPayment;
    }   
  catch (error: any) {    
    if(error && error.errors){
      this.modal.showDialogError("No es posible calcular la cuota en este momento.");
    }
}
  }

  formatNumber(number: number | string): string {
    return StringUtils.formatAmount(number);
  }
}
