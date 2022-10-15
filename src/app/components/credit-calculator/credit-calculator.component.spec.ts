import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditCalculatorComponent } from './credit-calculator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ModalController } from '../../shared/controller/modal-controller';
import { ValidatorAmountService } from '../../utils/validator/validator-amount/validator-amount-service';
import { SelectSpinnerComponent } from '../select-spinner/select-spinner.component';
import { InputComponent } from '../input/input.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { InputAlertsComponent } from '../input-alerts/input-alerts.component';
import { AmountInputComponent } from '../amount-input/amount-input.component';
import { QuoterService } from '@/app/services/credits/quoter/quoter.service';


describe('CreditCalculatorComponent', () => {
  let component: CreditCalculatorComponent;
  let fixture: ComponentFixture<CreditCalculatorComponent>;
  let quoterService: QuoterService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditCalculatorComponent, SelectSpinnerComponent, InputComponent, InputAlertsComponent, AmountInputComponent],
      providers: [ValidatorAmountService, DialogService, MessageService, ModalController, QuoterService],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCalculatorComponent);
    component = fixture.componentInstance;
    component.formQuoter = new FormGroup({
      amount: new FormControl('', Validators.required),
    });
    quoterService = TestBed.inject(QuoterService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call the calculateQuoter function when the amount is major than 0', () => {
    const calculateSpy = spyOn(component, 'calculateQuoter').and.callFake(() => Promise.resolve())
    component.amount = 5;
    component.ngOnInit()
    expect(calculateSpy).toHaveBeenCalledTimes(1)
  })

  it('Should set the term value and call the calculateQuoter function', () => {
    const calculateSpy = spyOn(component, 'calculateQuoter')
    component.eventQuoter(18);
    expect(component.term).toBe(18);
    expect(calculateSpy).toHaveBeenCalledTimes(1)
  })

  it('Should not call the service quoter', async () => {
    const serviceSpy = spyOn(quoterService, 'qouter')
    await component.calculateQuoter()
    expect(serviceSpy).toHaveBeenCalledTimes(0)
  })

  it('Should set the calculated fee from the backend', () => {
    component.formQuoter.get('amount')?.setValue(16000);
    const serviceSpy = spyOn(quoterService, 'qouter').and.callFake(() => Promise.resolve({ monthlyPayment: 200 }))
    component.calculateQuoter().then(() => {
      expect(serviceSpy).toHaveBeenCalledTimes(1)
      expect(component.fee).toBe(200)
    })
  })
});
