import { StringUtils } from '@/app/utils/stringutils/string-utils';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prequalified-customer-details',
  templateUrl: './prequalified-customer-details.component.html',
  styles: [
  ]
})
export class PrequalifiedCustomerDetailsComponent {
  @Input() name: string = 'Name';
  @Input() amount: string | number = '30,000';
  @Input() period: string | number = '24'
  @Input() fee: string | number = '1,600'

  formatNumber(number: number | string): string {
    return StringUtils.formatAmount(number);
  }
}
