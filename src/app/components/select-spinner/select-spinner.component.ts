import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-select-spinner',
  templateUrl: './select-spinner.component.html',
  styleUrls: ['./select-spinner.component.css'],
  
})
export class SelectSpinnerComponent implements OnInit {
  @Input() id: string = 'default-id';
  @Input() domain: number[] = [12, 18, 24];
  numberSelected: number=0;
  indexActive=0;
  @Input() containerClasses: string = '';
  @Output() changeEvent: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.indexActive=0;
    this.numberSelected=this.domain[this.indexActive];
   
  }


  clickPlus() {

   this.numberSelected=this.domain[this.nextIndex()];
   this.changeEvent.emit(this.numberSelected);
  }

  clickMinus() {

    this.numberSelected=this.domain[this.nextPrevious()];
    this.changeEvent.emit(this.numberSelected);
   }

  private nextIndex(): number {
    this.indexActive = (this.indexActive>= this.domain.length-1 )? this.domain.length -1:this.indexActive+1; 
    return this.indexActive;
  }

  private nextPrevious(): number {
    this.indexActive = (this.indexActive<=0 )? 0:this.indexActive-1; 
    return this.indexActive;
  }
}
