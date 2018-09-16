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
      timeout: 8000
    });

  suppliers = [];
  supplierFlag: boolean = false;
  buttonName = "Add Supplier";
  updateFlag: boolean = false;
  deleteFlag:boolean=false;
  message1:string;

  supplier: SupplierModel = new SupplierModel();
  ngOnInit() {
    this.supplierService.fetchSupplier()
      .subscribe(
        response => {
          console.log(response,"supplier list")
          this.suppliers = response.data;
          console.log(this.suppliers);
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
            this.supplierFlag = true;
            this.suppliers.push(response.data);
            this.message1="supplier added sucesfully"
            this.popToast();
            // setTimeout(() => {
            //   this.supplierFlag = false;
            // }, 2000)

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
            console.log(data,"update supplier successfull")
            if (data.success) {
              this.updateFlag = true;
              this.popToast();
              // setTimeout(() => {
              //   this.updateFlag = false;
              // }, 2000)
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
            this.deleteFlag=true;
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
      this.toasterSetvice.pop('success', 'Status', 'Supplier Updated Successfully!');
    } else if(this.supplierFlag){
      this.toasterSetvice.pop('success', 'Status', 'Supplier Added Successfully!');
    }else if(this.deleteFlag){
      this.toasterSetvice.pop('success', 'Status', 'Supplier Deleted Successfully!');
    }
  }

}