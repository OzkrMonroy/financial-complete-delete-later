import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';
import { ModalControllerModule } from './shared/controller/modal-controller.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    ComponentsModule,
    CoreModule,
    ModalControllerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
