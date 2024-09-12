import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder,FormArray,FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit,OnChanges, OnDestroy {
  @Input() departmentList:string[]=[];
  employeeForm!: FormGroup;
  submittedrecords:any[]=[];
  setviewastable:boolean=false;
  formChangesSubscription!: Subscription;
  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['departments']) {
      console.log('Departments input changed:', changes['departments'].currentValue);
    }
  }
  
  ngOnInit(): void {
    console.log(this.departmentList)
    this.employeeForm=this.fb.group({
      employees:this.fb.array([this.CreateEmployeeGroup()])
    })
  }
  get employees():FormArray{
    return this.employeeForm.get('employees') as FormArray
  }

  CreateEmployeeGroup():FormGroup{
         return this.fb.group({
          employeeName: ['', Validators.required],
          department: ['', Validators.required]
         });
  }
  submitForm() {
    console.log('Form submitted with value:', this.employeeForm.value);
    this.submittedrecords=this.employeeForm.value.employees;
    this.setviewastable=true
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
  
}
