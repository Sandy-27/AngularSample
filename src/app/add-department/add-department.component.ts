import { Component, Input,EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder,FormArray,FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmployeeformService } from '../employeeform.service';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit,OnChanges, OnDestroy {
[x: string]: any;
  @Input() departmentList:string[]=[];
  @Output() formSubmit:EventEmitter<any>=new EventEmitter<any>();
  @Output() formChange:EventEmitter<any>=new EventEmitter<any>();
  employeeForm!: FormGroup;
  submittedrecords:any[]=[];
  setviewastable:boolean=false;
  formChangesSubscription!: Subscription;
  constructor(private fb: FormBuilder,private employeeformservice:EmployeeformService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departmentList']) {
      console.log('Departments input changed:', changes['departmentList'].currentValue);
    }
  }
  
  ngOnInit(): void {
    console.log(this.departmentList)
    this.employeeForm=this.fb.group({
      employees:this.fb.array([this.CreateEmployeeGroup()])
    })
    this.employeeForm.valueChanges.subscribe((value:any)=>{
      this.formChange.emit(value)
    })
  }
  get employees():FormArray{
    return this.employeeForm.get('employees') as FormArray
  }

  CreateEmployeeGroup():FormGroup{
         return this.fb.group({
          employeeName: ['', Validators.required],
          department: ['', Validators.required],
          employeeImage:[null]
         });
  }
 
  submitForm() {
    this.employeeForm.markAllAsTouched();
    if (this.employeeForm.invalid) {
      console.log('Form is invalid');
      return; 
    }
   
    else{
      console.log('Form submitted with value:', this.employeeForm.value);
      this.submittedrecords=this.employeeForm.value.employees;
      this.formSubmit.emit(this.employeeForm.value);
      this.employeeformservice.getEmployeeDatewithservice(this.employeeForm.value);
      this.setviewastable=true
    }
  }
  AddEmployee(){
      this.employees.push(this.CreateEmployeeGroup());
    }

    removeEmployee(index: number) {
      this.employees.removeAt(index);
    }
    ngOnDestroy(): void {
      console.log('ngOnDestroy called: Cleaning up');
      // Unsubscribe from the form value changes to prevent memory leaks
      if (this.formChangesSubscription) {

        this.formChangesSubscription.unsubscribe();
      }
    }
    viewastable(){
        this.setviewastable=true
    }

    //file upload
    onFileUpload(event:any,index:number):void{
      const files=event.target.files;
      console.log(files)
      if (files && files.length > 0) {
        const file = files[0]; 
      if(file){
        const imagereader=new FileReader;
        imagereader.onload=()=>{
          this.employees.at(index).get('employeeImage')?.setValue(imagereader.result)
        }
        imagereader.readAsDataURL(file);
      }}
    }

    //send child data to parent using viewchild 
    getEmployeeData(){
      return this.employeeForm.value;
    }
  
}
