import { Component } from '@angular/core';
import { ID_ROOT_APP } from './utils/constApp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end-agentes-bancarios';
  idApp=ID_ROOT_APP;
}
