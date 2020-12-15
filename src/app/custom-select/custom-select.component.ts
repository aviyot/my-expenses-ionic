import { Component, Input, OnInit } from '@angular/core';

interface SelectProp {
  title:string;
  values:string[],
  selectedValue:string;
}

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent implements OnInit {
@Input() selectProp:SelectProp;
  constructor() { }

  ngOnInit() {}

}
