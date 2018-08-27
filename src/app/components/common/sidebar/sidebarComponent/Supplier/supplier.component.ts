import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupplierModel } from '../../../../../model/supplierModel';
import { SupplierService } from './../../../../../services/supplierServices'


@Component({
  selector: 'app-supplierList',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.style.css']

})
export class SupplierListComponent {
  constructor(private supplierService: SupplierService) { }

  suppliers = [];

  supplier: SupplierModel = new SupplierModel();

  ngOnInit() {
    this.supplierService.fetchSupplier()
      .subscribe(
        response => {
          console.log("suppliers", response.data);
          this.suppliers = response.data;
        },
        error => {
          console.log(error);
        }
      );
  }
}