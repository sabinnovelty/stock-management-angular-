import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupplierModel } from '../../../../../model/supplierModel';
import { SupplierService } from './../../../../../services/supplierServices'

import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-manageSupplier',
  templateUrl: './manageSupplier.component.html',
  styleUrls: ['./manageSupplier.component.style.css']

})
export class ManageSupplier {
  constructor(
    private supplierService: SupplierService,
    private toasterSetvice: ToasterService
  ) { }

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 5000
    });

  suppliers = [];
  supplierFlag: boolean = false;
  buttonName = "Add Supplier";
  updateFlag: boolean = false;

  supplier: SupplierModel = new SupplierModel();
  ngOnInit() {
    this.supplierService.fetchSupplier()
      .subscribe(
        response => {
          this.suppliers = response.data;
        },
        error => console.log(error)
      )
  }

  onSubmit(form: NgForm) {
    if (this.buttonName.toLocaleLowerCase() === "add supplier") {
      const newSupplier = new SupplierModel();
      console.log(form.value, newSupplier, "add");
      newSupplier.name = form.value.supplierName;
      newSupplier.address = form.value.supplierAddress;
      newSupplier.contact = form.value.supplierContact;
      this.supplierService.addSupplierInfo(newSupplier)
        .subscribe(
          response => {
            console.log(response, "supplier added sucesfully");
            this.popToast();
            this.supplierFlag = true;
            this.suppliers.push(response.data)
            setTimeout(() => {
              this.supplierFlag = false;
            }, 2000)

          }
        )
    } else {
      const updateSupplier = new SupplierModel();
      updateSupplier.name = form.value.supplierName;
      updateSupplier.address = form.value.supplierAddress;
      updateSupplier.contact = form.value.supplierContact;
      updateSupplier._id = this.supplier._id;
      console.log(updateSupplier)
      this.supplierService.updateSupplier(updateSupplier)
        .subscribe(
          data => {
            if (data.success) {
              this.updateFlag = true;
              setTimeout(() => {
                this.updateFlag = false;
              }, 2000)
            }
          }
        );
    }
  }

  deleteSupplier(supplier: any) {
    if (window.confirm("Are you sure you want to delete Supplier?")) {
      this.supplierService.deleteSupplier(supplier._id)
        .subscribe(
          response => {
            this.popToast();
            console.log(response);
            this.removeSupplierFromList(response.data)
          }
        )
    }
  }

  removeSupplierFromList(supplier: any) {
    var index = this.suppliers.findIndex((supp) => {
      return supp._id === supplier._id
    });
    this.suppliers.splice(index, 1);
  }

  updateSupplier(supplier) {
    console.log(supplier)
    this.buttonName = "Update Supplier";
    this.supplier = supplier;
    console.log(this.supplier, "edit supplier")
  }

  reset(form: NgForm) {
    this.buttonName = "Add Supplier";
    form.reset();
  }

  popToast() {
    if (this.updateFlag) {
      this.toasterSetvice.pop('success', 'Status', 'Supplier Added Successfully!');
    } else {
      this.toasterSetvice.pop('warning', 'Status', 'Supplier Deleted Successfully!');
    }   
  }

}