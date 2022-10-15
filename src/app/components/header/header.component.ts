import { ID_ROOT_APP_HEADER } from '@/app/utils/constApp';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  idHeader: string= ID_ROOT_APP_HEADER
  ;
}
