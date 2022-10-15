import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-select-spinner',
  templateUrl: './select-spinner.component.html',
  styleUrls: ['./select-spinner.component.css'],
  
})
export class SelectSpinnerComponent implements OnInit {
  @Input() id: string = 'default-id';
  @Input() domain: number[] = [12, 18, 24];
  @Input() value: number =0;
  
  indexActive=0;
  @Input() containerClasses: string = '';
  @Output() changeEvent: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.setInitValue();
    this.value=this.domain[this.indexActive];
   
  }

 private setInitValue() {
    let index: number = this.domain.indexOf(this.value);
    this.indexActive= (index<=-1)?0: index;
  }


  clickPlus() {

   this.value=this.domain[this.nextIndex()];
   this.changeEvent.emit(this.value);
  }

  clickMinus() {

    this.value=this.domain[this.nextPrevious()];
    this.changeEvent.emit(this.value);
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
