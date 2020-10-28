import { Component,Output,EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.scss'],
})
export class ControlButtonsComponent {

  @Output() actionType:EventEmitter<string> =  new EventEmitter<string>();
  @Input() expenseSelected = false;
  @Input() multiypleSelect:boolean = false;

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

 

  selectMultiplt(multiypleSelect){
    if(multiypleSelect)
     this.actionType.emit("multipplaySelect")
     else 
     this.actionType.emit("disableMultipplaySelect")

  }

}
