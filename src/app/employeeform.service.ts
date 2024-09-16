import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeformService {

  constructor() { }
    private employeeDataSubject=new BehaviorSubject<any>(null);
    employeeData$=this.employeeDataSubject.asObservable();
    getEmployeeDatewithservice(data:any){
      this.employeeDataSubject.next(data);
    }
}
