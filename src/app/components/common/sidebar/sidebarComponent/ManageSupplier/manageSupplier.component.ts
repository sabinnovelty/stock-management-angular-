import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupplierModel } from '../../../../../model/supplierModel';
import { SupplierService } from './../../../../../services/supplierServices'


@Component({
    selector: 'app-manageSupplier',
    templateUrl:'./manageSupplier.component.html',
    styleUrls:['./manageSupplier.component.style.css']
     
})
export class ManageSupplier {
  constructor(private supplierService:SupplierService){}

  suppliers=[];
  supplierFlag:boolean=false;
  buttonName="Add Supplier";
  updateFlag:boolean=false;
 
  supplier:SupplierModel=new SupplierModel();
  ngOnInit(){
    this.supplierService.fetchSupplier()
    .subscribe(
      response=>{
        this.suppliers=response.data;
      },
      error=>console.log(error)
    )
  }

  

  onSubmit(form:NgForm){
    if(this.buttonName.toLocaleLowerCase()==="add supplier"){
      const newSupplier=new SupplierModel();
      console.log(form.value,newSupplier,"add");
      newSupplier.name=form.value.supplierName;
      newSupplier.address=form.value.supplierAddress;
      newSupplier.contact=form.value.supplierContact;
      this.supplierService.addSupplierInfo(newSupplier)
      .subscribe(
        response=>{
          console.log(response,"supplier added sucesfully");
          this.supplierFlag=true;
          this.suppliers.push(response.data)
          setTimeout(()=>{
            this.supplierFlag=false;
          },2000)
        
        }
      )
    }else{
      const updateSupplier=new SupplierModel();
      updateSupplier.name=form.value.supplierName;
      updateSupplier.address=form.value.supplierAddress;
      updateSupplier.contact=form.value.supplierContact;
      updateSupplier._id=this.supplier._id;
      console.log(updateSupplier)
      this.supplierService.updateSupplier(updateSupplier)
      .subscribe(
        data=>{
          if(data.success){
            this.updateFlag=true;
            setTimeout(()=>{
              this.updateFlag=false;
            },2000)
          }
        }
      );
    }
      // this.supplierService.addSupplierInfo(this.supplier)
      // .subscribe(
      //   response=>{
      //     this.supplierFlag=true;
      //    this.suppliers.push(response.data);
      //    setTimeout(()=>{
      //      this.supplierFlag=false;
      //    },3000)
      //   },
      //   error=>console.log(error)
      // )
  }

  deleteSupplier(supplier){
    console.log(supplier,"delete");
    this.supplierService.deleteSupplier(supplier._id)
    .subscribe(
      response=>{
        console.log(response);
        this.suppliers.filter(supplier=>{
          return supplier._id!=response.data._id;
        })
      }
    )
  }

  findSupplierIndex(supplier,data){
    return supplier._id===data._id;
  }

  updateSupplier(supplier){
    console.log(supplier)
    this.buttonName="Update Supplier";
    this.supplier=supplier;
    console.log(this.supplier,"edit supplier")
  }

  reset(form:NgForm){

    this.buttonName="Add Supplier";
    form.reset();
  }

  

}