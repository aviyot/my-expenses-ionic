import { Component,Output,EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.scss'],
})
export class ControlButtonsComponent {

  @Output() actionType:EventEmitter<any> =  new EventEmitter<any>();
  @Input() expenseSelected = false;
  @Input() multiypleSelect:boolean = false;
  @Input() expandToolbar;
  constructor() { 
  }

  onAdd(){
     this.actionType.emit("add")
   }


  onEdit(){
    this.actionType.emit("edit")

  }

  onShowDetials(){
    this.actionType.emit("detial")
  }

  showSortAlert(){
    this.actionType.emit("sort")
  }
/* 
  editIncome() {
    this.actionType.emit("income")
  } */

  selectMultiplt(multiypleSelect){
    if(multiypleSelect)
     this.actionType.emit("multipplaySelect")
     else 
     this.actionType.emit("disableMultipplaySelect")

  }

  filterClicked(ev:any){
    this.actionType.emit({ev,action:"filter"})
  }

  onClick(){
    this.expandToolbar = !this.expandToolbar;
  }

}
