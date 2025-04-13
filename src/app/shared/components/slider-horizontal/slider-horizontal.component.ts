import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slider-horizontal',
  standalone: false,
  templateUrl: './slider-horizontal.component.html',
  styleUrl: './slider-horizontal.component.scss'
})
export class SliderHorizontalComponent implements OnInit{

  @Input() title: string = '';
  @Input() list: any[] = [];
  @Input() buttonTitle: string = '';
  @Output() actionButton = new EventEmitter<any>()
  @Output() actionItem = new EventEmitter<any>

  itemSelected: any;

  constructor(){
  }

  
  ngOnInit(): void {
    this.itemSelected = this.list[0]
  }


  actionForButton(){
    this.actionButton.emit("Hola");
  }

  actionItemList(item: any){    
    this.itemSelected = item;
    this.actionItem.emit(item)
  }

}
