import { PrequalifiedCustomerService } from '@/app/services/credits/prequalified/prequalified-customer.service';
import { ModalController } from '@/app/shared/controller/modal-controller';
import { PrequalifiedCustomer } from '@/app/shared/models/prequalified-customer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prequalified-customer-page',
  templateUrl: './prequalified-customer-page.component.html',
  styles: [
  ]
})
export class PrequalifiedCustomerPageComponent implements OnInit{
  customerDetails: PrequalifiedCustomer = {} as PrequalifiedCustomer
  customerName: string = ''

  constructor( private readonly route: Router, 
               private readonly prequalifiedCustomer: PrequalifiedCustomerService,
               public modalController: ModalController ){}
  
  async ngOnInit(): Promise<void> {
    try {
      //2263552921108
      
      this.customerDetails = await this.prequalifiedCustomer.verifyCustomer('2263552921108')
      this.customerName = this.customerDetails.name.split(" ")[0]
    } catch (error: any) {
      if(error && error.errors){
        this.modalController.showDialogError(error.errors[0], ()=>{
          this.route.navigate([`credits}`]);
  
        });
      }
    

      
    }
  }

  goTo(path: string){
    this.modalController.showDialogConfirmQuotation(this.customerDetails.period, this.customerDetails.amount,()=>{
      this.route.navigate([`credits/${path}`]);

    });
  }
}
