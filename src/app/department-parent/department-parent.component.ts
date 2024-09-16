import { Component, OnInit, ViewChild } from '@angular/core';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { EmployeeformService } from '../employeeform.service';

@Component({
  selector: 'app-department-parent',
  templateUrl: './department-parent.component.html',
  styleUrls: ['./department-parent.component.css']
})
export class DepartmentParentComponent implements OnInit {
  @ViewChild(AddDepartmentComponent) employeeData!:AddDepartmentComponent;
 departmentList:string[]=['.NET','LAMP','Admin','Testing','HR','Sales','Finance']
 storeEmployeeData:any
 opennewtab:boolean=false;
  constructor(
   private employeeService:EmployeeformService 
  ) { 
    setTimeout(() => {
      this.departmentList=['.NET','LAMP','Admin','Testing','HR','Finance','Sales']
    }, 5000);
  }
  
  ngOnInit(): void {
    this.employeeService.employeeData$.subscribe(data=>{
     this.storeEmployeeData=data
      console.log("data from child using services",data)
    })
  }
  //child to parent using ouput
  formSubmit(employeeData:any){
      console.log("EmployeeData while Submitting : ",employeeData)
  }
    //child to parent using output
  formChange(employeeDataChange:any){
      console.log("EmployeeData while Change : ",employeeDataChange)
  }
//child to parent using viewchild
  getDatafromChild(){
  const childemployeedata=this.employeeData.getEmployeeData();
  console.log("Employee Data from Child",childemployeedata)
  }
  openNewTab(){
this.opennewtab=true;
  }

}
