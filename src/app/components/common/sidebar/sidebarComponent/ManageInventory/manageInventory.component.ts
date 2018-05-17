import { Component } from '@angular/core';
import { ManageInventoryModel } from '../../../../../models/manageInventoryModel';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-manageInventory',
    templateUrl:'./manageInventory.component.html',
    styleUrls:['./manageInventory.component.style.css']
     
})
export class ManageInventory {

  // productName: any;

  manageInventory: ManageInventoryModel = new ManageInventoryModel();

  constructor(){}
 
  ngOnInit(){
   
  }

  onSubmit(f: NgForm) {
    console.log('Valid Ng Form!', f);
  }

}