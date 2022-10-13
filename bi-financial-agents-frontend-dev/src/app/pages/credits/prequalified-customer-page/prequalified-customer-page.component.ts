import { PrequalifiedCustomerService } from '@/app/services/credits/prequalified/prequalified-customer.service';
import { ModalController } from '@/app/shared/controller/modal-controller';
import { PrequalifiedCustomer } from '@/app/shared/models/prequalified-customer';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-prequalified-customer-page',
  templateUrl: './prequalified-customer-page.component.html',
  styles: [
  ]
})
export class PrequalifiedCustomerPageComponent{
  customerDetails: PrequalifiedCustomer = {} as PrequalifiedCustomer
  customerName: string = ''

  constructor( private readonly route: Router, 
               private activatedRoute: ActivatedRoute,
               private readonly prequalifiedCustomer: PrequalifiedCustomerService,
               public modalController: ModalController ){
                this.activatedRoute.queryParams.subscribe(() => {
                  if (this.route.getCurrentNavigation()?.extras?.state) {
                        this.customerDetails = this.route.getCurrentNavigation()?.extras.state?.customerDetails ;
                        this.customerName = this.customerDetails.name.split(' ')[0];
                      } else{
                        this.modalController.showDialogError("No se encontró información del crédito", ()=>{
                                this.goTo('');
                        });
                      }
                    });
                  

               }
  

      

  goTo(path: string){
      this.route.navigate([`credits/${path}`]);
  }

  modify() {
    this.modalController.showDialogInfo("Funcionalidad aún en backlog, se realizara proximamente.",()=>{});
  }

  applyFor(){
    this.modalController.showDialogConfirmQuotation(this.customerDetails.period, this.customerDetails.amount,()=>{
      this.route.navigate([`credits/quoter`]);

    });
  }
}
