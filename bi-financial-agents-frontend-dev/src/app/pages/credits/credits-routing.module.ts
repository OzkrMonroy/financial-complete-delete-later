import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DpiPageComponent } from './dpi-page/dpi-page.component';
import { PrequalifiedCustomerPageComponent } from './prequalified-customer-page/prequalified-customer-page.component';
import { QuoterPageComponent } from './quoter-page/quoter-page.component';

const routes: Routes = [{
  path: '',
  component: DpiPageComponent
}, {
  path: 'prequalified-customer',
  component: PrequalifiedCustomerPageComponent
}, {
  path: 'quoter',
  component: QuoterPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditsRoutingModule { }
