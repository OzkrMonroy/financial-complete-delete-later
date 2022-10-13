import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'credits',
		loadChildren: () => import('./pages/credits/credits.module').then(m => m.CreditsModule)
	},
  {
    path: '**',
    redirectTo: 'credits'
  },
];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }