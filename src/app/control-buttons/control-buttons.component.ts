import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.scss'],
})
export class ControlButtonsComponent implements OnInit {

  @Input() source: string;
  @Output() add:EventEmitter<any> =  new EventEmitter<null>();

  constructor( private router : Router) { 

  }

  ngOnInit() {}



  onAdd(){
   if(this.source === "home")
    this.router.navigate(['/','expense-add-form'])

  if(this.source === "form") {
    this.add.emit();
  this.router.navigate(['/','home'])
  }
}

  onDelete(){

  }

  onEdit(){

  }

  onUpdate(){

  }

}
