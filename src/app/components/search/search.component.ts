import { Component, Input,Output,EventEmitter } from '@angular/core';


@Component({
    selector: 'app-search',
    templateUrl:'./search.component.html',
    styleUrls:['./search.component.style.css']
     
})
export class SearchComponent {
  constructor(){}

  @Input() title:string;
  @Output() emitSerchValue=new EventEmitter();
  
 
  ngOnInit(){
   
  }

  searchProduct(event:string){
    this.emitSerchValue.emit(event)
  }

}