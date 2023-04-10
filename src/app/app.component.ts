import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from './service/department.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
    private departmentService: DepartmentService

  ) {}
  
    departmentList!: any[];
    selectedDepartment!: number;

    ngOnInit(){
      this.loadDepartments();
    }

    private loadDepartments(){
      this.departmentService.getDepartments().subscribe(data=>{
        this.departmentList = data;
        console.log('departments loaded', this.departmentList);
      })
    }

    onSelectedDepartment(selectedDepartmentId: number){
      this.departmentService.getSelectedDepartment(selectedDepartmentId).subscribe({
        next: (res) => {
        },
      error: (err) => {
        console.log(err);
      }}
      );
    }


}
