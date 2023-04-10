import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from './service/department.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor (
    private departmentService: DepartmentService

  ) {}
  
    departmentList!: any[];
    selectedDepartment!: number;

    dataSource!: MatTableDataSource<any>;
    displayedColumns: string[] = [
      'id',
      'name',
      'birthday',
      'action'
    ];


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
