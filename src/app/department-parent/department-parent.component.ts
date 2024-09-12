import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-parent',
  templateUrl: './department-parent.component.html',
  styleUrls: ['./department-parent.component.css']
})
export class DepartmentParentComponent implements OnInit {
 departmentList:string[]=['.NET','LAMP','Admin','Testing','HR','Sales','Finance']
  constructor(
    
  ) { 
    setTimeout(() => {
      this.departmentList=['.NET','LAMP','Admin','Testing','HR','Finance','Sales']
    }, 5000);
  }
  
  ngOnInit(): void {
  }

}
